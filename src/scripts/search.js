var Search = function(){

    function createInput() {
        var select = document.querySelectorAll('.modal-wrapper select')[0],
            input = document.createElement('input');
        input.className = 'search';
        input.placeholder = 'Поиск';
        select.insertAdjacentHTML('afterEnd', input.outerHTML);

    }
    function search() {
        // Declare variables
        var input, filter, i, txtValue, div;
        input = document.getElementsByClassName('search')[0];
        console.log(input);
        filter = input.value.toUpperCase();
        result = document.getElementsByClassName("result")[0];
        div = result.getElementsByTagName('div');
        console.log(div);

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < div.length; i++) {
            //a = div[i].getElementsByTagName("a")[0];
            txtValue = div[i].textContent || div[i].innerText;
            console.log(txtValue);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                div[i].style.display = "";
            } else {
                div[i].style.display = "none";
            }
        }
    }

    function listener() {
        var input = document.getElementsByClassName('search')[0];
        console.log(input);
        input.addEventListener('input', search);

    }

    return {
        init: function () {
            createInput();
            listener();
        },
    };
};