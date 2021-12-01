let input = document.querySelector('.inp')
let list = document.querySelector('#app')
let all = document.querySelector('.all')
let complete = document.querySelector('.complete')
let incomplete = document.querySelector('.incomplete')
let lists = null

function createElements(...arr) {
    return arr.map((el) => {
        return document.createElement(el)
    })
}
function addList(value) {
    list.innerHTML = null
    if (value) {
        for (let i =0;i<value.length;i++) {
            let [li, span, button] = createElements('li', 'span', 'button')
            
            li.className = 'list'
            span.textContent = value[i][0]
            if (!value[i][1]) {
                span.className = 'list through'
            }
            button.textContent = 'X'
            button.setAttribute('id', 'delete')
            
            li.append(span, button)
            list.append(li)
            span.addEventListener('click',function(){
                let arr = JSON.parse(localStorage.getItem('data'))
                arr[i][1] ? arr[i][1] = false : arr[i][1] = true
                localStorage.setItem('data', JSON.stringify(arr))
                addList(JSON.parse(localStorage.getItem('data')))
              
            })
            button.addEventListener('click', () => {
                let arr = JSON.parse(localStorage.getItem('data'))
                arr.splice(arr.indexOf(arr[i]), 1);
                localStorage.setItem('data', JSON.stringify(arr))
                addList(JSON.parse(localStorage.getItem('data')))
            })

            lists = document.querySelectorAll('.list')
        }
    }
}
addList(JSON.parse(localStorage.getItem('data')))

form.onsubmit = event => {
    event.preventDefault()
    if (input.value) {
        add(input.value)
    }
}

function add (value) {
    let arr = JSON.parse(localStorage.getItem('data'))
    if (!arr) arr = []

    arr.push([value, true])
    localStorage.setItem('data', JSON.stringify(arr))

    addList(JSON.parse(localStorage.getItem('data')))

}

complete.addEventListener('click', () => {
    console.log('hello');
    let arr = JSON.parse(localStorage.getItem('data'))
    let arr1 = []
    for(let i of arr) {
        if (i[1] == true) arr1.push(i)
    }
    addList(arr1)
})

incomplete.addEventListener('click', () => {
    console.log('hello');
    let arr = JSON.parse(localStorage.getItem('data'))
    let arr1 = []
    for(let i of arr) {
        if (i[1] == false) arr1.push(i)
    }
    addList(arr1)
})

all.addEventListener('click', () => {
    addList(JSON.parse(localStorage.getItem('data')))
})

