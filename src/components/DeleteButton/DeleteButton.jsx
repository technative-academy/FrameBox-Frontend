function DeleteButton({ onClick, nameOfButton }) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className="absolute z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-l"
        >
            {nameOfButton}
        </button>
    );
}

export default DeleteButton;
