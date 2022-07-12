//wait for the content to load 
window.addEventListener(`load`,()=>{
    //selection
    const bubble = document.querySelector(`.bubble`)//selecting the custum bubble tag !!!PS replaced as document!!! 
    const video_circle_ = bubble.querySelector(`.bubble_ .video_`)//none active video state
    const circle_container_ = bubble.querySelector(`.bubble_`)//bottom video component
    const open_container_ = bubble.querySelector(`.bubble_open_`)
    const btns_ = bubble.querySelectorAll(`.controls_ .icon_`)
    const video_ = open_container_.querySelector(`.video_`)         
    
    const pause_icon_ = bubble.querySelector(`#pause_`)
    const play_icon_= bubble.querySelector(`#play_`)
    const volume_icon_= bubble.querySelector(`#volume_`)
    const mute_icon_ =  bubble.querySelector(`#mute_`)
    const close_btn_ = bubble.querySelector(`.close_btn_`)

    // Fuctions
    //funtion that opens the video
    function open_(){
        circle_container_.classList.add(`none_`)
        open_container_.classList.remove(`none_`)

        video_.play()
        video_.muted = false
    }
    //closes video active state
    function close_(){
        circle_container_.classList.remove(`none_`)
        open_container_.classList.add(`none_`)
    }
    //restarts the video
    function refresh_ (){
        video_.currentTime = 0
        video_.play()
    
    }
    function mute_(){
                video_.muted = true
                volume_icon_.classList.add(`none_`)
                mute_icon_.classList.remove(`none_`)   
    }

    ///video controls
    function control_(){
        btns_.forEach(btn=>{
            let id_ = btn.id

            btn.addEventListener(`click`,()=>{
                console.log(id_);
            if(id_==`close_`){
               close_()
               mute_()
            }
            if(id_==`pause_`){
               video_.pause()
               pause_icon_.classList.add(`none_`)
               play_icon_.classList.remove(`none_`)
            }
            if(id_==`play_`){
                video_.play()
                pause_icon_.classList.remove(`none_`)
                play_icon_.classList.add(`none_`)
            }
            if(id_==`refresh_`){
               refresh_()
            }
            if(id_==`volume_`){
                video_.muted = false
                volume_icon_.classList.add(`none_`)
                mute_icon_.classList.remove(`none_`)
            }
            if(id_==`mute_`){
                video_.muted = true
                volume_icon_.classList.remove(`none_`)
                mute_icon_.classList.add(`none_`)
            }
                
            })
            
        })
    }

    //event
    //close the entire widget
    close_btn_.addEventListener(`click`,()=>{
        bubble.classList.add(`none_`)
    })
    video_circle_.addEventListener(`click`,open_)
    control_()
})
