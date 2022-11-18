//Peru function

// kiem tra 1 so co phai so le hay khong
export const isOddNumber = (number) => number %2 === 1


// dem so chan trong 1 mang
export const countEvenNumber = (numberList) =>{
    if(!Array.isArray(numberList)) return 0;
    return numberList.filter(x => x%2 ===0).length
    // return numberList.filter(x => x%2 ===0).length +1

}
