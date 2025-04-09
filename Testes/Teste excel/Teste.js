const scriptURL = ''

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})

function doPost(e) {
  return ContentService.createTextOutput("Success")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({'Access-Control-Allow-Origin': '*'});
}
