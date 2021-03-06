// console.log("start");

var budgetControler = (function(){
    var Income = function(id, description, value ){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Expense = function(id, description, value ){
        this.id = id;
        this.description = description;
        this.value = value;
        this.getPercentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome){
       if (totalIncome > 0){
            this.getPercentage = Math.round((this.value /totalIncome ) * 100);
       } 
       else{
            this.getPercentage = -1;
       }
    }

    Expense.prototype.getPercentage = function(){
        return this.getPercentage;
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
            
            console.log(data.allItems[type].length);
            // create new id
            if(data.allItems[type].length > 0){
                alert('id 1');
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                console.log('id 1');
            }else{
                ID = 0;
                console.log('id 0');
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

        deleteItem: function(type, id){
            var ids, index;

            ids = data.allItems[type].map(function(current){
                console.log(current.id);
                return current.id;
            });

            index = ids.indexOf(id);
            console.log(index);

            if(index !== -1){
                console.log('slice');
               var sliceEl=  data.allItems[type].splice(index, 1);
                console.log(sliceEl);
            }
        },

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

        calcPercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function(){
            allper = data.allItems.exp.map(function(cur){
                return cur.getPercentage;
            });
            return allper;
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
        container: '.container',
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

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type == 'exp'){
                element = DomStrings.expenseClass;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';            
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

        deleteItemUi: function(slectorId) {
            var el = document.getElementById(slectorId);
            el.parentNode.removeChild(el);
        },
    }
})();



var appControler = (function(uiCtrl, budctrl){
    var addItem,  updateBudget, ctrlDeleteitem;
    
    function addEventlistner(){
        var DOM = uiCtrl.getDomStrings();
        document.querySelector('.add__btn').addEventListener('click',  addItem);

        document.addEventListener('keypress', function(event){
            // console.log(event);
            if(event.keyCode === 13 || event.which === 13)  {
                addItem();
            }
        });

        // delete event
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteitem);
    }

    // update budget function
    updateBudget = function(){
        var budget;

        //1 calculateBudget
        budctrl.calculateBudget()

        //2 get calculateBudget
        budget = budctrl.getCalculateBudget();

        //3 display budget
        uiCtrl.displayBudget(budget);

        console.log(budget);
    }

    updatePercentages = function(){
        //1. calculate persontage
        budctrl.calcPercentages();

        // 2. get percentage
        var getperc = budctrl.getPercentages();
        
        // 3.  display percentage UI
        console.log(getperc);
    }

    addItem = function(){
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

            // 5. calculate and update percentage
            updatePercentages();
        }

    },


    ctrlDeleteitem = function(event){
        var ItemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(ItemId){
           var splitId, deleteItemId, deleteItemType;

           splitId = ItemId.split('-');

           deleteItemType = splitId[0];
           deleteItemId = parseInt(splitId[1]);

           console.log(deleteItemId, deleteItemType);

        //    1. delete item data structure
            budctrl.deleteItem(deleteItemType, deleteItemId);

        // delete item UI
            uiCtrl.deleteItemUi(ItemId);

        // update new budget
            updateBudget();
        }
    }

    return {
        init: function(){
            return addEventlistner();
        }
    }
})(uiControler, budgetControler);

appControler.init();
// document.querySelector('add__btn').addEventlistner('keypress', )x