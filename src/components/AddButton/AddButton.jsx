function AddButton({ type }) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                setShowPlaylistMenu(!showPlaylistMenu);
            }}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-l sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        >
            +
        </button>
    );
}

export default AddButton;
