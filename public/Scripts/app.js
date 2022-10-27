/* app.js - Nhat Phuc Nguyen - 301157980 - September/28/2022 */
(function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const titleName = document.querySelector("title").textContent.trim();
    const deleteBtns = document.querySelectorAll(".btn-danger");  

    // Switch the active mode between links
    function activeNavLink() {
        navLinks.forEach(navLink => {
            if (navLink.textContent.trim() === titleName) {
                navLink.classList.add("active");
            }
        });
    }

    //Display alert message to confirm or cancel the deletion
    function deleteContact(){
        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click',(e)=>{
                if(!confirm("Are you sure to delete this contact ?")){                    
                    e.preventDefault();
                    window.location.assign('/business-contacts');                                        
                }
            })
        })
    }
        
    window.addEventListener("load", () => {
        activeNavLink();
        deleteContact();
    });

}());