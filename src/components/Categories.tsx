type Props = {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
};

export default function Categories({ categories, selected, onClick }: Props) {
  return (
    <nav className="sm:w-[8%] sm:text-center">
      <h2 className="underline underline-offset-8 decoration-highlight decoration-2 py-3 text-xs sm:text-sm">
        Category
      </h2>
      <ul className="flex sm:inline-block justify-between">
        {categories.map(category => (
          <li
            key={category}
            onClick={() => onClick(category)}
            className={`${
              category === selected ? 'text-highlight' : 'text-primary'
            } cursor-pointer px-1 pb-2 sm:px-0 sm:py-0.5 text-xs sm:text-sm whitespace-nowrap`}
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}
