


//find the first and last occurance of a number in a sorted array
    const findFirstAndLastOccurance = function(arr, target){
        let first = -1;
        let last = -1;
        let hi = arr.length - 1;
        let low = 0;
        
        
        while(true){
            
            if(arr[hi] === target && last === -1)
                last = hi;
            if(arr[low] === target && first === -1)
                first = low;
                
                hi--;
                low++;
                
                if(first != -1 && last != -1)
                return [first,last]
                
                if(hi === 0 || low === arr.length - 1 || arr.length === 0)
                return [first,last]
            }
            
            
    }

    
    //setting max and duplicate to off will limit the number of elements in array
    const makeRandomArray = function(length, max,  sorted = true, duplicates = true){
        
        let array = [];
        
        for(let i = 0 ; i < length; i++){
            array.push(Math.floor( Math.random() *  max))
        }
    
        if(sorted){
            array.sort((a,b)=>a-b)
        }
        if(!duplicates){
            array = [...new Set(array)]
        }
    
        return array;
    }
    //console.log(makeRandomArray(100,1000, true, false))
    
    const linearSearch = function(arr, target){//O(n)
        if(target === null)
            return -1

        
        for(let i = 0; i< arr.length; i++){
            if(arr[i] === target)
            return i
        }
        return -1;
    }
    
    
    const binarySearch = function(arr, target){//O(log(n))
        if(target === null)
            return -1
        
        let left = 0 
        let right = arr.length - 1
        let middle = Math.round((arr.length - 1)/2)
        
        while (left <= right){
            
            middle = Math.round((left + right)/2)
            
            if(arr[middle] === target)
                return middle;
            else if(arr[middle] < target)
                left = middle + 1;
            else
                right = middle - 1;
        }

        return -1
    }
    
    

    const selectionSortSwapHelper = function(arr,x,y){
        
        let temp = arr[x]
        arr[x] = arr[y];
        arr[y] = temp;
    }
    const selectionSort = function(origArr , size){
        let arr = origArr; 
        let minIndx;

         for(let i = 0; i < size - 1; i++){
            minIndx = i
            for(let j = i; j < size; j++ ){
                if(arr[j] < arr[minIndx])
                    minIndx = j;
            }

            selectionSortSwapHelper(arr,minIndx,i);

         }
         return arr;
    }
    











    
    
    //main program
    let tempArr = [];
    
    
    
    document.querySelector("#make-array-btn").addEventListener("click", (e)=>{
        e.preventDefault()
        
        let targetTable = document.getElementById("current-array")
        targetTable.innerHTML = "";
        let size = document.querySelector("#size").value;
        let max = document.querySelector("#max").value;
        let sorted = document.querySelector("#sorted").checked;
        let duplicate = document.querySelector("#duplicates").checked;
        


        tempArr = makeRandomArray(size, max, sorted, duplicate)
        
        
        for(let i = tempArr.length-1;  i >= 0  ; i--){
            
            let row = targetTable.insertRow(0);
            let index = row.insertCell(0);
            let value = row.insertCell(1);
            
            
            index.innerHTML = i;
            value.innerHTML = " "+tempArr[i];
            if(i === 0){//add table header
                let row = targetTable.insertRow(0);
                let index = row.insertCell(0);
                let value = row.insertCell(1);
                index.innerHTML = "-Index-";
                value.innerHTML = "-Value-";
            }
        }
    })

    document.querySelector("#calculate-btn").addEventListener("click", (e)=>{
        e.preventDefault();
        //clear all warnings and errors
        let oldErr = document.querySelector(".error") 
        oldErr?.remove();
        let oldWarn = document.querySelector(".warning") 
        oldWarn?.remove();

        console.log(tempArr.length)

        let sorted = document.querySelector("#sorted").checked;



        let searchTarget = parseInt(document.querySelector("#search-target").value)

        let form = document.querySelector("#calculate")
        if(tempArr.length === 0){
           let err = document.createElement('p')
           err.classList.add("error")
           err.innerText = "array is empty"
           form.appendChild(err)
        }

        let algorithm = document.querySelector("#alg-options").value
        switch(algorithm){
            case "Binary-Search":{
                if(!sorted){//if not sorted binary search won't work
                    let warn = document.createElement('p')
                    warn.classList.add("warning")
                    warn.innerText = "Binary search requires sorted array"
                    form.appendChild(warn)
                }
                let startTime = performance.now();
                let result = binarySearch(tempArr,searchTarget)
                let endTime = performance.now();
                let resultTime = endTime - startTime;
                
                let targetDiv = document.querySelector(".result")
                let fullResult = document.createElement('p')
                
                if(result === -1)//if result not found
                    fullResult.innerText = `Alg: ${algorithm} Result: Not Found, Time elapsed: ${resultTime} `
                else
                    fullResult.innerText = `Alg: ${algorithm} Result: ${result}, Time elapsed: ${resultTime} `
                
                targetDiv.appendChild(fullResult)
                break;
                
            }
            case "Linear-Search":{
                let startTime = performance.now();
                let result = linearSearch(tempArr,searchTarget)
                let endTime = performance.now();
                let resultTime = endTime - startTime;
                
                let targetDiv = document.querySelector(".result")
                let fullResult = document.createElement('p')
                
                if(result === -1)//if result not found
                    fullResult.innerText = `Alg: ${algorithm} Result: Not Found, Time elapsed: ${resultTime} `
                else
                    fullResult.innerText = `Alg: ${algorithm} Result: ${result}, Time elapsed: ${resultTime} `
                
                targetDiv.appendChild(fullResult)
                break;
            }
            case "Selection-Sort":{
                
                let startTime = performance.now();
                selectionSort(tempArr,tempArr.length)
                let endTime = performance.now();
                let resultTime = endTime - startTime;
                
                let targetDiv = document.querySelector(".result")
                let fullResult = document.createElement('p')
                fullResult.innerText =  ` Copy of Array sorted, time elapsed: ${resultTime}`
                targetDiv.appendChild(fullResult)
                break;
            }
        
    
    
        }
            

    })
    //erase results
    document.querySelector("#remove-results-btn").addEventListener('click', (e)=>{
        e.preventDefault();

        //empty previous result
        let prevResultDiv = document.querySelector(".result")
        prevResultDiv.innerHTML = "";


    })

    
    
    
    
    
    