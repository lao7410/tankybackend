let obj = {}
    for(let i = 0;i<10000; i++) {
        let number = Math.floor(Math.random() * 20 +1)
        console.log(number)

        if(!obj[number]){

            obj[number] = 1 
            
        }else{
            obj[number]++
        }
        
    }
console.log(obj)