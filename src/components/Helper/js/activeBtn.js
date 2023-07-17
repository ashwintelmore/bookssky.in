export const activeBtn = (menuItem, menuItems)=>{

    menuItem.addEventListener("click", e => {
        const targetLink = e.target.closest('a');

        if (targetLink !== null) {
            menuItems.forEach(li => {
                if (li === targetLink) {
                    li.classList.add('active-link');
                }else{
                    li.classList.remove('active-link');
                }
            });
        }
    })
}