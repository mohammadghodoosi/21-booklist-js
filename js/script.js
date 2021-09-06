//Book Class for saving each submit in an object
class Book{
  constructor(title,author,isbn){
    this.title=title
    this.author=author
    this.isbn=isbn
  }
}

//UI Class and its method for each events in the UI
class UI{
  //first method for showing the submit in table
  addToList(book){
    const row=document.createElement('tr')
    const table=document.getElementById('body-book')
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td class='delete'><a class='delete' href='#'>X</a></td>
    `
    table.appendChild(row)
  }
  //second method for showing alert when fields are not fully complete
  showAlert(message){
    const div=document.createElement('div')
    const parent=document.getElementById('parent')
    div.className='bg-success text-center'
    div.appendChild(document.createTextNode(message))
    parent.insertBefore(div,form)
    setTimeout(function(){div.remove()},3000)
  }
  //third method for clearing the field after each submit
  clearFields(){
    title.value=''
    author.value=''
    isbn.value=''
  }
  //forth method for deleting each book from the table
  clearRow(target){
    if(target.className==='delete'){
      target.parentElement.parentElement.remove()
      this.showAlert('book deleted...')
    }
  }
};
//Store Class for resisting the data in LocalStorage
class Store{
  //first method is for building the base for LS or for getting the data of LS as array
  store(){
    let books
    if(localStorage.getItem('books')===null){
      books=[]
      alert('b')
    }else{
      books=JSON.parse(localStorage.getItem('books'));
    }
    return books
  }
  //second method is for adding new submit as an object to array of previous step and send the array to LS as json data
  sendToLS(pac){
   const books=this.store()
    books.push(pac)
    localStorage.setItem('books',JSON.stringify(books))
  }
  //third method is for displaying the array of the first method whenever page renders
  display(){
    const books=this.store()
    books.forEach(function(book){
      const ui=new UI
      ui.addToList(book)
    })
  }
  //forth method is for deleting the data from first method whenever user delete a row in table from ui and sending new array as json data to LS
  delete(isbn){
    console.log(isbn)
    const books=this.store()
    books.forEach(function(book,index){
      if(book.isbn==isbn){
        books.splice(index,1)
      }
    })
    localStorage.setItem('books',JSON.stringify(books))
  }
}
//choosing and adding event handler to form element
const form=document.getElementById('book-form')
const btn=document.getElementById('btn')
const ui=new UI
const store=new Store
btn.addEventListener('click',function(e){
  //getting the data from the fields and calling proper method classes 
  const title=document.getElementById('title').value;
  const author=document.getElementById('author').value;
  const isbn=document.getElementById('isbn').value ;
  const book=new Book(title,author,isbn)
  if(title!==''&&author!==''&&isbn!==''){
    ui.addToList(book)
    ui.clearFields()
    store.sendToLS(book)
  }else{ui.showAlert('fill all the field...')}
 e.preventDefault()
})
//adding eventlistener to table area whenever is clicked and use event delegation to reach X. then calling proper method
document.getElementById('table-book').addEventListener('click',function(e){
  ui.clearRow(e.target)
  store.delete(e.target.parentElement.previousElementSibling.textContent)
})
//adding event listener for whenever the page renders
document.addEventListener('DOMContent',store.display())





