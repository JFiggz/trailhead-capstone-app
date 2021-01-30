export default function Btn({ addClass, children, handleClick, type }) {
    //Btn with a few optional props that will only render when the prop has been set
    return (
        <button className={`btn ${addClass ? addClass : ""}`} onClick={handleClick && ((e) => { handleClick(e) })} type={type ? type : "submit"}>
            {children}
        </button>
    );
};