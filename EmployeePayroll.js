// **************************************UC-1******************************
// Modify Employee payroll class with new Attributes and Getter and setters

class EmployeePayrollData{
    // getter and setter Method
    get id(){return this._id;}
    set id(id){
        this._id=id;
    }
    get name(){ return this.name;}
    set name(name){
        let nameRegex = RegExp('^[A-Z{1}[a-zA-Z\\s{2,}$')
        if(nameRegex.test(name))
        this.name = name;
        else throw'Name is Incorrect!';
    }
     get profilePic(){ return this.profilePic;}
     set profilePic(profilePic){
        this.profilePic=profilePic;
     }

     get gender(){return this._gender;}
      set gender(gender){
        this._gender = gender;

      }
      get department(){ return this._department;}
      set department(department){
         this._department=department;
      }
 
      get salary(){return this._salary;}
       set salary(salary){
         this._salary = salary;
 
       }
       get note(){ return this._note;}
      set note(note){
         this._note=note;
      }
 
      get startDate(){return this._satrtDate;}
       set startDate(startdate){
         this._satrtDate = this.startDate
       }
 
    //    method

    toString(){
        const options = {year:'numeric',month:'long',day: 'numeric'};
        const empDate = !this.startDate ? "undefined" :
        this.startDate.toLocalDateString("en-US",options);
        return "id=" +this.id + ",name'" +this.name+ ",gender='" +this.gender +", salary="
        +this.salry +", startDate=" +empDate +", note" +this.note;
    }
}

// ***************************************UC-2**********************************************
// on Document Load set Event listners
    window.addEventListener('DOMContentLoaded', (Event) =>{
        const name = document.querySelector('#name');
        const textError = document.querySelector('.text-error');
        name.addEventListener('input', function() {
            if(name.value.length ==0){
                textError.textContent="";
                return;

            }
            try{
                (new EmployeePayrollData()).name = name.value;;
                textError.textContent ="";

            }catch (e){
                textError.textContent = e;

            }
        });

        const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input',function(){
         output.textContent = salary.value;
        }
    
        }    )

        // **********************************UC-3**********************************************
        //  On save Create Employee Payroll Object
        const save = () =>{
            try{
                let EmployeePayrollData = createEmployeePayroll();
            }catch(e){
                return;
            }
        }
        const createEmployeePayroll =() =>{
            let employeePayrollData = new EmployeePayrollData();
             try{
                employeePayrollData.name = getInputValueById("#name");


            }catch(e){
                setTextValue('.text-error',e);
                throw e;
            }
            employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
            employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
            employeePayrollData.department = getSelectedValues('[name=department]')
            employeePayrollData.salary =getInputValueById('#salary');
            employeePayrollData.note = getInputValueById('#notes');
            let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+ getInputValueById('#year');
            employeePayrollData.date = Date.parse(date);
            alert(employeePayrollData.toString());
            return employeePayrollData;
        }

        const getSelectedValues =(propertyValue) =>{
            let allItems = document.querySelectorAll(propertyValue);
            let selItems =[];
            allItems.forEach(item => {
                if(item.checked) selItems.push(item.value);
            })
            return selItems;
        }

        // 1: querySelector is the newer feature.
        // 2:the querySelector method can be used when selecting by element name,
        // nesting or class name.
        // 3:querySelector lets you find element with elements with rules that can not be expressed with getElementId
        
        const getInputValueById =(id) =>{
            let value =document.querySelector(id).value;
            return value;
        }

        // 1:getElemntById is better supported than querySelectorin older versions of the browsers
        // 2:the thing with getElemntById is that it onlyallows to select anelements by its id.


        // const getInputValueById = (id) =>{
        //     let value = document.getElementById(id).value;
        //     return value;
        // }

        // ********************************** UC-4**************************************************

// Saving Employee Payroll to Local Storage

       const save =() => {
        try{
            let employeePayrollData = createEmployeePayroll();
            createAndUpdateStorage(employeePayrollData);
        }catch(e){
            return;
        }
       }

       function createAndUpdateStorage(employeePayrollData){
        let employeepayrollList= JSON.parse(localStorage.getItem("EmployeePayrollList"));
        if(employeepayrollList != undefined){
            employeepayrollList.push(employeePayrollData);
        }else{
            employeepayrollList =[employeePayrollData]
        }
        alert(employeepayrollList.toString());
        localStorage.setItem("EmployeePayrollList",JSON.stringify(employeepayrollList))
       }
        
// ****************************UC-5************************************************************************

// Reset the EmplyeePayroll form

 const resetForm = () => {
    setvalue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setvalue('#year','2020');
 }
 const unsetSelectedValues = (propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        item.checked=false;
    });
 }

 const setTextValue =(id,value)=>{
    const element = document.querySelector(id);
    element.textContent = value;
 }
 const setValue = (id,value)=>{
    const element= document.querySelector(id);
    element.value=value;
 }