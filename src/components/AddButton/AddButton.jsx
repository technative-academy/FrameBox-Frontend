function AddButton({ type }) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                setShowPlaylistMenu(!showPlaylistMenu);
            }}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"
        >
            +
        </button>
    );
}

export default AddButton;
