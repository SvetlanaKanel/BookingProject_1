const getColorNameOfDay = ($el) => {
    for (let i = 0; i < 7; i++) {
        const colorNameOfDay = $el[i].ownerDocument.defaultView
            .getComputedStyle($el[i], "before")
            .getPropertyValue("color");

        return colorNameOfDay;
    }
};

export default getColorNameOfDay;