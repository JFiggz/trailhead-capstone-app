// Add error appropriate psuedo class to parent label upon failing validation checks

export function addError(element, error) {
    error && element.parentElement.classList.add(error);
};

export function removeError(element, errors) {
    errors && errors.forEach(err => {
        element.parentElement.classList.remove(err);
    });
};