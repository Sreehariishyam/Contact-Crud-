contacts = []

if(sessionStorage.getItem("contacts")){
    contacts = JSON.parse(sessionStorage.getItem("contacts"))
    displayContactList()
}

contactForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const contactNameInput = contactName.value
    const contactPhoneInput = contactPhone.value
    const contactEmailInput = contactEmail.value

    if(contactNameInput && contactPhoneInput && contactEmailInput){

        const editIndex = editStatus.value

        if(editIndex == ""){
            contacts.push({
                contactName:contactNameInput,
                contactPhone:contactPhoneInput,
                contactEmail:contactEmailInput
            })
        }else{
            contacts[editIndex] = {
                contactName:contactNameInput,
                contactPhone:contactPhoneInput,
                contactEmail:contactEmailInput
            }
        }
        console.log(contacts);
    }else{
        alert("please fill in the form completely")
        return
    }
    contactForm.reset()
    editStatus.value = ""

    sessionStorage.setItem("contacts",JSON.stringify(contacts))
    displayContactList()
})

function displayContactList(){
    tableBody.innerHTML = ""
    contacts.forEach((item,index)=>{
        tableBody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.contactName}</td>
            <td>${item.contactPhone}</td>
            <td>${item.contactEmail}</td>
            <td>
                <button onclick="editContact(${index})" class="btn btn-warning">Edit</button>
                <button onclick="deleteContact(${index})" class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    })
}

function editContact(contactIndex){
    const contactDetails = contacts[contactIndex]
    console.log(contactDetails);

    contactName.value = contactDetails.contactName
    contactPhone.value = contactDetails.contactPhone
    contactEmail.value = contactDetails.contactEmail
    editStatus.value = contactIndex
}

function deleteContact(contactIndex){
    if(confirm("Are you sure, you want to delete the contact")){
        contacts.splice(contactIndex,1)
        sessionStorage.setItem("contacts",JSON.stringify(contacts))
        displayContactList()
    }
}




