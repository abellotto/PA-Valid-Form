let validator = {
    handleSubmit: (event)=> {
        event.preventDefault();
        let send = true;

        validator.removeError();

        let inputs = form.querySelectorAll('input');
        for (let i=0; i<inputs.length; i++) {
            let input = inputs[i];
            
            let check = validator.checkInput(input);
            if (check !== true) {
                send = false;
                validator.showError(input, check);
            }

        }

        
        if (send) {
            form.submit();
        }



    },

    checkInput: (input)=> {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (let rule in rules) {
                let ruleDetails = rules[rule].split('=');
                switch(ruleDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return "Campo não pode ser vazio."
                        }
                    break;
                    case 'min':
                        if (input.value.length < ruleDetails[1]) {
                            return `Campo precisa ter pelo menos ${ruleDetails[1]} caracteres`
                        }

                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                    break;
                }
                
                

            }
        }

        return true;
    },

    showError: (input, error) => {
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        //insere antes do input. ParentElement volta um elemento, nesse caso seria o label
        //input.parentElement.insertBefore(errorElement, input);

        input.parentElement.insertBefore(errorElement, input.elementSibling);
    },

    removeError: ()=> {
        let inputs = form.querySelectorAll('input');
        for (let i=0;i<inputs.length;i++) {
            inputs[i].style='';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i=0;i<errorElements.length;i++) {
            errorElements[i].remove();
        }
    }

};

let form = document.querySelector(".formValidator");
form.addEventListener('submit', validator.handleSubmit);