/**
* change number format USD 99 987,25$  to 99987.25 (extract all characters except digits, minus, comma and convert decimal comma to decimal dot )
* change number format USD $99,987.25  to 99987.25 (extract all characters except digits, minus )
* 
* @returns float number with decimal dot without any chadacter 
*/
const getAmountFormat  = (element) => {
    return element.then($price => {
        let num = $price.text().indexOf(".") != -1 ? $price.text().replace(/[^0-9.-]+/g, "") : $price.text().replace(/[^0-9,-]+/g, "").replace(",", ".")
        return parseFloat(num)
    })
}

export default getAmountFormat
