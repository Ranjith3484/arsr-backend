const express = require('express')
const Employee = require('../models/employee.model');

const router = new express.Router()

router.post('/employee/create', (req, res) => {

  const employee = new Employee({
    employeeName: req.body.employeeName,
    email: req.body.email,
    phone: req.body.phone,
  })

   employee.save().then(() => {
    res.status(200).json({
      data: "Employee added"
    })
  }).catch((e) => {
    res.status(400).json({
      data: "Email "+employee.email+" is already taken"
    })
  })
})

router.put("/employee/update", async (req, res) => {
  try {
    let employee = await Employee.findOneAndUpdate(
      {email: req.body.email },
      {
        $set: {
          employeeName:req.body.employeeName,
          phone:req.body.phone,
        }
      },
      { upsert: true }
    );
    res.status(200).json({
        data: "Employee data updated"
    });
  } catch (err) {
    res.status(500).json({
        data: err.message
    });
  }
});

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

router.get('/employee/get/all', (req,res) => {
  const { page, size, employeeName } = req.query;
  var condition = employeeName
    ? { employeeName: { $regex: new RegExp(employeeName), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page-1, size);

  Employee.paginate(condition, { offset, limit, sort: ({ updatedAt: -1 })})
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        employee: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ",
      });
    });
})

router.get('/employee/get', (req,res) => {
    const id = req.query.id;
    console.log(id)
    Employee.find ({"_id" : id}).then((employee) =>{
        res.status(201).send({
            data:employee[0]
        })
    }).catch((e) => {
        res.status(401).json({
            data: "no data"
        });
    })
})

router.delete('/employee/delete', (req,res) => {
    const id = req.query.id;
    Employee.findByIdAndDelete(id).then((employee) =>{
        res.status(201).send({
            data:employee
        })
    }).catch((e) => {
        res.status(401).json({
            data: "no data"
        });
    })
})

module.exports = router
