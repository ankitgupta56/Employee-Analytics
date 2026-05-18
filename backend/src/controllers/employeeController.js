import Employee from '../models/Employee.js';

// @desc Add a new employee
// @route POST /api/employees
// @access Private (HR/Admin)
export const addEmployee = async (req, res, next) => {
  try {
    const { name, email, department, skills, performanceScore, experience } =
      req.body;

    // Validation
    if (
      !name ||
      !email ||
      !department ||
      !skills ||
      performanceScore === undefined ||
      experience === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    if (skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one skill is required',
      });
    }

    // Check if employee with same email exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee with this email already exists',
      });
    }

    // Create employee
    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all employees
// @route GET /api/employees
// @access Private
export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Search employees by department
// @route GET /api/employees/search?department=Development
// @access Private
export const searchEmployees = async (req, res, next) => {
  try {
    const { department, skill, name } = req.query;

    const filter = {};

    if (department) {
      filter.department = department;
    }

    if (skill) {
      filter.skills = { $in: [skill] };
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    const employees = await Employee.find(filter).populate(
      'createdBy',
      'name email'
    );

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get single employee
// @route GET /api/employees/:id
// @access Private
export const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update employee
// @route PUT /api/employees/:id
// @access Private (HR/Admin)
export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete employee
// @route DELETE /api/employees/:id
// @access Private (Admin)
export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get employee statistics
// @route GET /api/employees/stats/summary
// @access Private
export const getEmployeeStats = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const avgPerformance = await Employee.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$performanceScore' },
        },
      },
    ]);

    const departmentStats = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
          avgScore: { $avg: '$performanceScore' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        averagePerformance:
          avgPerformance.length > 0 ? avgPerformance[0].avgScore : 0,
        departmentStats,
      },
    });
  } catch (error) {
    next(error);
  }
};
