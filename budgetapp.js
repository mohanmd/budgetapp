// console.log("start");

var budgetControler = (function(){
<<<<<<< HEAD
=======
    // var x = 10;

    // var add = function(a){
    //     return x+a;
    // }

    // return{
    //     publicTest: function(b){
    //        return add(b);
    //     }
    // }

>>>>>>> 43b3f4eeeff91a6b6259515bc2be2b4e5b4f4ecc
    var Income = function(id, description, value ){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Expense = function(id, description, value ){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    // calculate budget 
    var calculateTotal = function(type){
        var sum = 0;

        data.allItems[type].forEach(function(cur){
            sum = sum + cur.value;
            // alert(sum);
            // alert(cur.value);
        });
        // add data structure
        data.totals[type] = sum;
    }
        
    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals:{
            inc: 0,
            exp: 0,
        },
        budget: 0,
        percentage: 0,
    }

    return {
        addItemCtrl: function(type, description, value){
            var ID, newItem;
            ID = 0;
<<<<<<< HEAD
            
            console.log(data.allItems[type].length);
            // create new id
            if(data.allItems[type].length > 0){
                alert('id 1');
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                console.log('id 1');
            }else{
                ID = 0;
                console.log('id 0');
=======
    
            // create new id
            if(ID > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
>>>>>>> 43b3f4eeeff91a6b6259515bc2be2b4e5b4f4ecc
            }
    
            // create new object using id
            if(type === 'exp'){
                newItem = new Expense(ID, description, value);
            }else if(type === 'inc'){
                newItem = new Income(ID, description, value);
            }
    
            data.allItems[type].push(newItem);
    
            return newItem;
        },

<<<<<<< HEAD
        deleteItem: function(type, id){
            var id, index;

            ids = data.allItems[type].map(function(current){
                return current.id;
                console.log(current.id);
            });
        },

=======
>>>>>>> 43b3f4eeeff91a6b6259515bc2be2b4e5b4f4ecc
        calculateBudget: function(){
            calculateTotal('inc');
            calculateTotal('exp');

            // calculate data.budeget
            data.budget = data.totals.inc - data.totals.exp;
            console.log(data.budget);

            // calculate percentage
            if(data.totals.inc > 0){
                alert('income is greater than 0');
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
            
        },

        getCalculateBudget: function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
        },

        testing: function(){
            return data;
        }
    }
})();



var uiControler = (function(){
    // create object for store elemnt classes
    var DomStrings = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        incomeClass: '.income__list',
        expenseClass: '.expenses__list',
        budgetLabel: '.budget__value',
        incLabel: '.budget__income--value',
        expLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
<<<<<<< HEAD
        container: '.container',
=======
>>>>>>> 43b3f4eeeff91a6b6259515bc2be2b4e5b4f4ecc
    }

    // get input value
    return{
        getInput: function(){
            return{
                type: document.querySelector(DomStrings.type).value,
                description: document.querySelector(DomStrings.description).value,
                value: parseInt(document.querySelector(DomStrings.value).value),
            }
        },
        
        getDomStrings: function(){
            return DomStrings;
        },

        // add item
        additemUi: function(obj, type){
            var html, newHtml, element;

            if(type == 'inc'){
                element = DomStrings.incomeClass;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type == 'exp'){
                element = DomStrings.expenseClass;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';            
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            console.log(newHtml);

            // add value to html element
            // console.log(typeof(element));
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            // console.log('itswork');
        },
        
        // clear values input
        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DomStrings.description + ',' + DomStrings.value);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = '';
            });

            // focus on description
            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            document.querySelector(DomStrings.budgetLabel).textContent = '₹ ' + obj.budget;
            document.querySelector(DomStrings.incLabel).textContent = '+ ₹' + obj.totalInc;
            console.log(obj.budget);
            document.querySelector(DomStrings.expLabel).textContent = '- ₹' + obj.totalExp;
            document.querySelector(DomStrings.percentageLabel).textContent = obj.percentage + ' %';
        },
    }
})();



var appControler = (function(uiCtrl, budctrl){

    function addEventlistner(){
<<<<<<< HEAD
        var DOM = uiCtrl.getDomStrings();
=======
>>>>>>> 43b3f4eeeff91a6b6259515bc2be2b4e5b4f4ecc
        document.querySelector('.add__btn').addEventListener('click',  addItem);

        document.addEventListener('keypress', function(event){
            // console.log(event);
            if(event.keyCode === 13 || event.which === 13)  {
                addItem();
            }
        });
<<<<<<< HEAD

        // delete event
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteitem);
=======
>>>>>>> 43b3f4eeeff91a6b6259515bc2be2b4e5b4f4ecc
    }

    // update budget function
    var updateBudget = function(){
        var budget;

        //1 calculateBudget
        budctrl.calculateBudget()

        //2 get calculateBudget
        budget = budctrl.getCalculateBudget();

        //3 display budget
        uiCtrl.displayBudget(budget);

        console.log(budget);
    }

<<<<<<< HEAD
    var addItem = function(){
=======
    function addItem(){
>>>>>>> 43b3f4eeeff91a6b6259515bc2be2b4e5b4f4ecc
        var input, newItem;
        
        // 1.get input data
        input = uiCtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0){
            // 2. passing input values to budget controler
            newItem = budctrl.addItemCtrl(input.type, input.description, input.value);
    
            // 3. display UI
            uiCtrl.additemUi(newItem, input.type);
    
            // 4. clear Fields
            uiCtrl.clearFields();

            // call update budget
            updateBudget();
        }

    }

<<<<<<< HEAD
    var ctrlDeleteitem = function(event){
        var deleteItemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        console.log(deleteItemId);
    }

=======
>>>>>>> 43b3f4eeeff91a6b6259515bc2be2b4e5b4f4ecc
    return {
        init: function(){
            return addEventlistner();
        }
    }
})(uiControler, budgetControler);

appControler.init();
// document.querySelector('add__btn').addEventlistner('keypress', )x