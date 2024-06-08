const returnedPrice = extractAdditionalPrice(' 2.2GHz 15.2 selectedHDDText: 400 GB  [+100.00]')
console.log(returnedPrice + 1)


function extractAdditionalPrice(fullText) {
    const regex = /\+\d+\.\d+/g;
    const matches = fullText.match(regex);
    return Number(matches[0].replace('+', ''));
}