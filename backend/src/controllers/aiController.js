import axios from 'axios';
import Employee from '../models/Employee.js';

// Fallback AI recommendation generator (in case OpenRouter fails)
const generateFallbackRecommendation = (employee, avgPerformance) => {
  const performanceGap = employee.performanceScore - avgPerformance;
  const primarySkill = employee.skills[0] || 'core competencies';
  let recommendation = '';

  if (employee.performanceScore >= 85) {
    recommendation = `🌟 **HR ADVISORY REPORT – ${employee.name.toUpperCase()}**\n\n**PERFORMANCE LEVEL:** Exceptional Performer (Score: ${employee.performanceScore}/100)\n\n---\n\n**1. PERFORMANCE ASSESSMENT:**\n• Current Status: Exceeds expectations significantly\n• Performance Gap: +${(performanceGap).toFixed(1)} points above team average\n• Strengths: Consistently delivers high-quality work, demonstrates initiative and leadership\n• Key Achievement: Performing in the top percentile across all performance metrics\n\n**2. PROMOTION RECOMMENDATION:**\n✓ READY FOR PROMOTION\n• Recommended Roles: Leadership/Management position, Subject Matter Expert, Team Lead\n• Rationale: Demonstrates exceptional competency and ready for increased responsibility\n• Timeline: Eligible for immediate promotion consideration\n\n**3. TRAINING & DEVELOPMENT:**\n• Priority: Advanced Leadership Development Program\n• Focus Areas: Strategic planning, team management, ${primarySkill}\n• Suggested Programs: Executive coaching, advanced certifications\n• Timeline: Enroll within next quarter\n\n**4. CAREER PATH:**\n• Short-term (6 months): Lead strategic projects, mentor junior team members\n• Medium-term (1-2 years): Senior leadership position or specialist role\n• Long-term (2+ years): Management or executive track`;
  } else if (employee.performanceScore >= 70) {
    recommendation = `✅ **HR ADVISORY REPORT – ${employee.name.toUpperCase()}**\n\n**PERFORMANCE LEVEL:** Solid Performer (Score: ${employee.performanceScore}/100)\n\n---\n\n**1. PERFORMANCE ASSESSMENT:**\n• Current Status: Meets and occasionally exceeds expectations\n• Performance Gap: ${performanceGap > 0 ? '+' : ''}${(performanceGap).toFixed(1)} points vs team average\n• Strengths: Reliable contributor, good technical skills, positive team collaboration\n• Areas for Growth: Strategic thinking, advanced problem-solving\n\n**2. PROMOTION RECOMMENDATION:**\n→ CONSIDER FOR ADVANCEMENT\n• Potential Roles: Senior position in current department, specialist track\n• Prerequisites: Complete targeted skill development, demonstrate leadership capability\n• Timeline: Eligible within 1-2 years with performance improvement\n\n**3. TRAINING & DEVELOPMENT:**\n• Priority: Specialized skill enhancement in ${primarySkill}\n• Focus Areas: Leadership foundations, advanced technical certifications\n• Suggested Programs: Professional development courses, project management training\n• Timeline: Immediate enrollment recommended\n\n**4. CAREER PATH:**\n• Short-term (6 months): Take on project leadership or mentorship roles\n• Medium-term (1-2 years): Advanced specialist or team lead position\n• Long-term (2+ years): Senior management consideration`;
  } else if (employee.performanceScore >= 50) {
    recommendation = `⚠️ **HR ADVISORY REPORT – ${employee.name.toUpperCase()}**\n\n**PERFORMANCE LEVEL:** Developing Performer (Score: ${employee.performanceScore}/100)\n\n---\n\n**1. PERFORMANCE ASSESSMENT:**\n• Current Status: Below performance expectations\n• Performance Gap: ${performanceGap > 0 ? '+' : ''}${(performanceGap).toFixed(1)} points vs team average\n• Strengths: Foundation skills present, capacity for improvement\n• Areas Needing Improvement: ${primarySkill}, consistency, time management, quality assurance\n\n**2. PERFORMANCE IMPROVEMENT PLAN (PIP):**\n✓ REQUIRED - Implementation necessary\n• Duration: 90-day improvement period\n• Goals: Achieve minimum 70/100 performance score\n• Accountability: Regular monthly reviews with manager\n• Support: Dedicated mentoring and coaching\n\n**3. TRAINING & DEVELOPMENT:**\n• Priority: Intensive skill development in ${primarySkill}\n• Focus Areas: Core competencies, professional fundamentals\n• Suggested Programs: Mandatory training in weak areas, skill enhancement workshops\n• Timeline: Start immediately, complete within 60 days\n\n**4. NEXT STEPS:**\n• Document performance expectations clearly\n• Schedule weekly check-ins with direct manager\n• Provide constructive feedback and support resources\n• Reassess in 30 days, full review in 90 days`;
  } else {
    recommendation = `🔴 **HR ADVISORY REPORT – ${employee.name.toUpperCase()}**\n\n**PERFORMANCE LEVEL:** Critical Support Needed (Score: ${employee.performanceScore}/100)\n\n---\n\n**1. PERFORMANCE ASSESSMENT:**\n• Current Status: Significantly below expectations - URGENT ATTENTION REQUIRED\n• Performance Gap: ${performanceGap > 0 ? '+' : ''}${(performanceGap).toFixed(1)} points vs team average\n• Critical Areas: ${primarySkill}, core job responsibilities, quality standards\n• Risk Level: HIGH - Immediate intervention required\n\n**2. FORMAL IMPROVEMENT PLAN (MANDATORY):**\n✓ REQUIRED - Immediate implementation\n• Duration: 60-day intensive improvement period\n• Minimum Target: Achieve 60/100 performance score\n• Frequency: Bi-weekly progress reviews\n• Escalation: Involves HR, direct manager, and department leadership\n\n**3. IMMEDIATE ACTIONS:**\n• Conduct formal performance improvement meeting within 48 hours\n• Assign dedicated mentor/coach for daily guidance\n• Provide additional training resources and support\n• Document all interactions and progress\n• Consider role reassignment or restructuring\n\n**4. CRITICAL TIMELINES:**\n• Week 1: Formal PIP document signed and acknowledged\n• Week 2-6: Intensive support and training phase\n• Week 8: Mid-point assessment and plan adjustment if needed\n• Week 10: Final evaluation - decision on continued employment\n\n**5. SUPPORT RESOURCES:**\n• Daily one-on-one coaching sessions\n• Peer mentoring from top performer\n• Additional training materials and workshops\n• Employee Assistance Program (EAP) services available`;
  }

  return recommendation;
};

// @desc Get AI recommendation for an employee
// @route POST /api/ai/recommend
// @access Private
export const getAIRecommendation = async (req, res, next) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID is required',
      });
    }

    // Get employee details
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Get all employees for ranking context
    const allEmployees = await Employee.find({});
    const avgPerformance =
      allEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) /
      allEmployees.length;

    let aiResponse;

    try {
      // Prepare prompt for AI
      const prompt = `You are an expert HR advisor. Analyze this employee data and provide a comprehensive, structured HR recommendation report.

Employee Details:
- Name: ${employee.name}
- Email: ${employee.email}
- Department: ${employee.department}
- Skills: ${employee.skills.join(', ')}
- Performance Score: ${employee.performanceScore}/100
- Years of Experience: ${employee.experience}
- Team Average Performance: ${avgPerformance.toFixed(2)}/100

IMPORTANT: Format your response with clear sections using the following structure:

**1. PERFORMANCE ASSESSMENT:**
[Analyze current performance level, compare to team average, identify strengths and areas for improvement]

**2. PROMOTION RECOMMENDATION:**
[Provide clear recommendation: READY FOR PROMOTION / CONSIDER FOR ADVANCEMENT / NOT RECOMMENDED AT THIS TIME]
[Include rationale and timeline if applicable]

**3. TRAINING & DEVELOPMENT:**
[Suggest specific training programs, focus areas, and timeline for development]

**4. CAREER PATH:**
[Outline short-term (6 months), medium-term (1-2 years), and long-term (2+ years) career progression]

Use bullet points for clarity. Be specific and actionable in all recommendations.`.trim();

      // Call OpenRouter API (using free model)
      const response = await axios.post(
        `${process.env.OPENROUTER_BASE_URL}/chat/completions`,
        {
          model: 'openrouter/free',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'Employee Analytics AI',
          },
          timeout: 30000,
        }
      );

      aiResponse = response.data.choices?.[0]?.message?.content || generateFallbackRecommendation(employee, avgPerformance);
    } catch (apiError) {
      console.error('OpenRouter API Error:', apiError.response?.data || apiError.message);
      // Use fallback recommendation if API fails
      aiResponse = generateFallbackRecommendation(employee, avgPerformance);
    }

    res.status(200).json({
      success: true,
      data: {
        employeeId,
        employeeName: employee.name,
        performanceScore: employee.performanceScore,
        department: employee.department,
        skills: employee.skills,
        aiRecommendation: aiResponse,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('AI Recommendation Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get AI recommendation',
      error: error.message,
    });
  }
};

// Fallback recommendation generator for batch
const generateFallbackBatchRecommendation = (employee, ranking, totalCount) => {
  let recommendation = '';
  
  if (employee.performanceScore >= 80) {
    recommendation = `🌟 **RANK #${ranking}** - Top Performer\n• Status: Exceptional performance, exceeds all expectations\n• Action: Promote to leadership, assign strategic projects, provide mentorship opportunities\n• Priority: High - immediate advancement consideration`;
  } else if (employee.performanceScore >= 65) {
    recommendation = `✅ **RANK #${ranking}** - Strong Performer\n• Status: Meets expectations consistently, reliable contributor\n• Action: Assign specialized projects, provide advanced training, consider for senior roles\n• Priority: Medium - development and advancement pathway`;
  } else if (employee.performanceScore >= 50) {
    recommendation = `⚠️ **RANK #${ranking}** - Developing Performer\n• Status: Below average performance, needs improvement\n• Action: Implement 90-day performance improvement plan, provide mentoring\n• Priority: Medium - support and skill enhancement required`;
  } else {
    recommendation = `🔴 **RANK #${ranking}** - Critical Support Needed\n• Status: Significantly below expectations, urgent intervention needed\n• Action: Implement formal improvement plan, assign daily coaching, document progress\n• Priority: High - immediate management attention required`;
  }
  
  return recommendation;
};

// @desc Get recommendations for multiple employees
// @route POST /api/ai/recommend-batch
// @access Private
export const getBatchRecommendations = async (req, res, next) => {
  try {
    const { employeeIds } = req.body;

    if (!employeeIds || employeeIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one employee ID is required',
      });
    }

    // Get employees
    const employees = await Employee.find({
      _id: { $in: employeeIds },
    });

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No employees found',
      });
    }

    // Sort by performance score for ranking
    const sortedEmployees = employees.sort(
      (a, b) => b.performanceScore - a.performanceScore
    );

    const recommendations = [];

    for (let i = 0; i < sortedEmployees.length; i++) {
      const employee = sortedEmployees[i];
      const ranking = i + 1;
      let recommendation = '';

      try {
        const prompt = `You are an expert HR advisor. Provide a structured recommendation for this employee in the context of team ranking:

Employee Profile:
- Name: ${employee.name}
- Rank: ${ranking}/${sortedEmployees.length}
- Performance Score: ${employee.performanceScore}/100
- Skills: ${employee.skills.join(', ')}
- Experience: ${employee.experience} years
- Department: ${employee.department}

Format your response with these clear sections:
• **Rank & Status:** Current position and performance level
• **Key Strengths:** What they excel at
• **Recommendations:** Specific actions - promotion, training, or improvement plan
• **Timeline:** Suggested implementation timeframe

Be specific and actionable. Keep response concise but comprehensive.`.trim();

        const response = await axios.post(
          `${process.env.OPENROUTER_BASE_URL}/chat/completions`,
          {
            model: 'openrouter/free',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 250,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'http://localhost:3000',
              'X-Title': 'Employee Analytics AI',
            },
            timeout: 20000,
          }
        );

        recommendation = response.data.choices?.[0]?.message?.content || generateFallbackBatchRecommendation(employee, ranking, sortedEmployees.length);
      } catch (error) {
        console.error(`Error getting recommendation for ${employee.name}:`, error.message);
        // Use fallback if API fails for this employee
        recommendation = generateFallbackBatchRecommendation(employee, ranking, sortedEmployees.length);
      }

      recommendations.push({
        employeeId: employee._id,
        employeeName: employee.name,
        ranking,
        performanceScore: employee.performanceScore,
        department: employee.department,
        recommendation,
      });
    }

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Batch Recommendation Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get batch recommendations',
      error: error.message,
    });
  }
};
