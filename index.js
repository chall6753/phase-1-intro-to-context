function createEmployeeRecord(arr){
    let newObj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents:[],
        timeOutEvents:[]
        }
       return newObj
    }

function createEmployeeRecords(arrOfArr){
    console.log(arrOfArr)
    let newArr = arrOfArr.map(createEmployeeRecord)
    return newArr

}

function createTimeInEvent(employeeObj,dateTime){
    let timeInObj = {
        type: 'TimeIn',
        hour: parseFloat(dateTime.slice(11,15)),
        date:dateTime.slice(0,10)
    }
    employeeObj.timeInEvents[employeeObj.timeInEvents.length] = timeInObj
    return employeeObj
}

function createTimeOutEvent(employeeObj,dateTime){
    let timeOutObj = {
        type: 'TimeOut',
        hour: parseFloat(dateTime.slice(11,15)),
        date:dateTime.slice(0,10)
    }
    employeeObj.timeOutEvents[employeeObj.timeOutEvents.length] = timeOutObj
    return employeeObj
}

function hoursWorkedOnDate(employee,dateWorked){
   let timeIn = 0
    let timeOut = 0
    employee.timeInEvents.map(function(obj){
       if (obj.date === dateWorked){
            timeIn = obj.hour
            // console.log(`time in ${timeIn}`)
       }})   
    employee.timeOutEvents.map(function(obj){
        
        if (obj.date === dateWorked){
            timeOut = obj.hour
            // console.log(`time out ${timeOut}`)
    }})
    let hoursWorked = (timeOut-timeIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(employee,dateWorked){
    let hoursWorked = hoursWorkedOnDate(employee,dateWorked)
    // console.log(`daily pay ${hoursWorked * employee.payPerHour}`)
    return hoursWorked * employee.payPerHour
}

function allWagesFor(employee){
    // console.log(employee.timeInEvents)
    return employee.timeInEvents.reduce(function(accumulator,obj,){
        let dailyWage = wagesEarnedOnDate(employee,obj.date)
        accumulator += dailyWage
        // console.log(accumulator)
        return accumulator
    },0)
}

function calculatePayroll(array){
    return array.reduce(function(accumulator, obj){
        let totalEmployeePay = allWagesFor(obj)
        accumulator += totalEmployeePay
        return accumulator
    },0)
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// // console.log(cRecord)
//         updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
//         updatedBpRecord = createTimeInEvent(cRecord, "0045-03-15 0700")
//                 // console.log(updatedBpRecord)
//         updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
//         updatedBpRecord = createTimeOutEvent(cRecord, "0045-03-15 1800")
//         // console.log(cRecord)

//         // wagesEarnedOnDate(cRecord, "0044-03-15")
//         allWagesFor(cRecord)