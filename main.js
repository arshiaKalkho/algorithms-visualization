


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
   
    //linear search
    const linearSearch = function(arr, target){//O(n)
        if(target === null)
            return -1

        
        for(let i = 0; i< arr.length; i++){
            if(arr[i] === target)
            return i
        }
        return -1;
    }
    
    //binary search
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
    
    
    
    
    
    
    
    //selection sort
    const selectionSortSwapHelper = function(arr,x,y){
        
        let temp = arr[x]
        arr[x] = arr[y];
        arr[y] = temp;
    }
    const selectionSort = function(origArr , size){//O(n^2)
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
    
    
    
    //bubble sort
    const bubbleSortSwapHelper = function(arr,a,b){
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
    const bubbleSort = function(arr, size){//O(n^2)
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size - i - 1; j++){
                if(arr[j] > arr[j+1])
                    bubbleSortSwapHelper(arr, j,j+1)
            }
        }
    }
   
    
    //qucik sort
    const qucikSortSwapHelper = function(arr,x,y){
        
        let temp = arr[x]
        arr[x] = arr[y];
        arr[y] = temp;
    }
    const qucikSortPartitionHelper = function(arr, low, high){
        let pivot = arr[high]
        let i = low - 1;

        for(let j = low; j <= high -1; j++){
            if(arr[j] < pivot){
                i++;
                qucikSortSwapHelper(arr,i,j)
            }
        }
        qucikSortSwapHelper(arr, i+1,high);
        return i+1;
    }
    //use a random(last in this case) element as pivot and arrange everything smaller on
    //side and bigger on the other, keep changing pivot until list is sorted
    const quickSort = function(arr, low, high){
        
        if(low < high){
            let pi = qucikSortPartitionHelper(arr, low, high);
            quickSort(arr, low, pi -1);
            quickSort(arr, pi+1, high);
        }
        
    }




    const sendError = function(text){
        let form = document.querySelector("#calculate")
        let err = document.createElement('p')
        err.classList.add("error")
        err.innerText = text
        form.appendChild(err)
    }

    const sendWarning = function(text){
        let form = document.querySelector("#calculate")
        let warn = document.createElement('p')
        warn.classList.add("warning")
        warn.innerText = text
        form.appendChild(warn)
    }
    const removeErrAndWarn = function(){
        let oldErr = document.querySelector(".error") 
        oldErr?.remove();
        let oldWarn = document.querySelector(".warning") 
        oldWarn?.remove();
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
        removeErrAndWarn()

        let sorted = document.querySelector("#sorted").checked;
        let searchTarget = parseInt(document.querySelector("#search-target").value)
        if(tempArr.length === 0){
           sendError("array is empty")
            return
        }

        let algorithm = document.querySelector("#alg-options").value
        switch(algorithm){
            case "Binary-Search":{
                if(!sorted){//if not sorted binary search won't work
                    sendWarning("Binary search requires sorted array")
                }
                let startTime = performance.now();
                let result = binarySearch(tempArr,searchTarget)
                let endTime = performance.now();
                let resultTime = endTime - startTime;
                
                let targetDiv = document.querySelector(".result")
                let fullResult = document.createElement('p')
                
                if(result === -1)//if result not found
                    fullResult.innerText = `Alg: ${algorithm} Result: Not Found, Time elapsed: ${resultTime}ms `
                else
                    fullResult.innerText = `Alg: ${algorithm} Result: ${result}, Time elapsed: ${resultTime}ms `
                
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
                    fullResult.innerText = `Alg: ${algorithm} Result: Not Found, Time elapsed: ${resultTime}ms `
                else
                    fullResult.innerText = `Alg: ${algorithm} Result: ${result}, Time elapsed: ${resultTime}ms `
                
                targetDiv.appendChild(fullResult)
                break;
            }
            case "Selection-Sort":{
                if(sorted){
                    sendWarning("sorting a sorted array")
                }

                let startTime = performance.now();
                selectionSort(tempArr,tempArr.length)
                let endTime = performance.now();
                let resultTime = endTime - startTime;
                
                let targetDiv = document.querySelector(".result")
                let fullResult = document.createElement('p')
                fullResult.innerText =  ` Copy of Array sorted using Selection Sort, time elapsed: ${resultTime}ms`
                targetDiv.appendChild(fullResult)
                break;
            }
            case "Bubble-Sort":{
                if(sorted){
                    sendWarning("sorting a sorted array")
                }
                let startTime = performance.now();
                bubbleSort(tempArr,tempArr.length -1 )
                
                let endTime = performance.now();
                let resultTime = endTime - startTime;
                let targetDiv = document.querySelector(".result")
                let fullResult = document.createElement('p')
                fullResult.innerText =  ` A copy of the Array sorted using Bubble Sort, time elapsed: ${resultTime}ms`
                targetDiv.appendChild(fullResult)
            
                break;
            }
            case "Quick-Sort":{
                
                if(sorted){
                    sendWarning("sorting a sorted array")
                }
                let startTime = performance.now();
                quickSort(tempArr, 0 ,tempArr.length -1 )
                
                let endTime = performance.now();
                let resultTime = endTime - startTime;
                let targetDiv = document.querySelector(".result")
                let fullResult = document.createElement('p')
                fullResult.innerText =  ` """Actuall""" Array sorted using Quick Sort, time elapsed: ${resultTime}ms`
                targetDiv.appendChild(fullResult)
                sendWarning("to avoid stack depth exceeding err, the actual array is sorted now please create a new one")
                break;
            }
            
            
    
        }
            

    })


    
          
    
    //erase results
    document.querySelector("#remove-results-btn").addEventListener('click', (e)=>{
        e.preventDefault();
        removeErrAndWarn()
        //empty previous result
        let prevResultDiv = document.querySelector(".result")
        prevResultDiv.innerHTML = "";


    })

    
    
    
    
    
    