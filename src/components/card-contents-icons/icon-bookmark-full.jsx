const BookmarkFull = () => {
  return (
    <div className="bookmark-full  w-[15px] h-[15px]  absolute mt-2.5 ml-2.5 ">
      <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
        <path
          strokeWidth="1.5"
          d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
          fill="#FFF"
          className="stroke-white group-hover:stroke-black"
        />
      </svg>
    </div>
  );
};

export default BookmarkFull;
