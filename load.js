const add = document.querySelector('.fa-chevron-down');
const remove = document.getElementById('remove');
const TaskbarCt = document.querySelector('.content_modal');
const soical = document.querySelectorAll('.soical');
const ject = {
    handleEvents: function() {  
        window.addEventListener('load', (e) => {
            document.body.classList.remove('preLoading_Page')
            setTimeout(() => {
                document.querySelector('.loading').style.display = 'none'
            }, 200);
        })

        add.onclick = () => {
            TaskbarCt.classList.remove('remove');
            TaskbarCt.classList.add('show');
        }

        remove.onclick = () => {
            TaskbarCt.classList.remove('show');
            TaskbarCt.classList.add('remove');
        }
        
        soical.forEach((e, index) => {
            e.onclick = (e) => {
                e.preventDefault();

                if(index === 0) {
                    window.location.href = 'https://www.facebook.com/ducpham.66'
                }
                else if(index === 1) {
                    window.location.href = 'https://www.youtube.com/channel/UCKiShxT5xSwj8RIiPm_W4vw'
                }
                else if(index === 2) {
                    window.location.href = 'https://www.tiktok.com/@z.z.z.z.zz.zz?lang=vi-VN'
                }
                else if(index === 3) {
                    window.location.href = 'https://github.com/Ducpham176'
                }
            }
        })
    },

    start: function() {
        this.handleEvents();
    }
}
ject.start();