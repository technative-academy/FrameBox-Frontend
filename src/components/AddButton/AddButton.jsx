function AddButton() {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                setShowPlaylistMenu(!showPlaylistMenu);
            }}
            className="z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-l"
        >
            ...
        </button>
    );
}

export default AddButton;
