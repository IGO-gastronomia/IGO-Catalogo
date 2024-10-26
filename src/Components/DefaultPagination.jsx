import PropTypes from "prop-types";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function DefaultPagination({
  activePage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const next = () => {
    if (activePage === totalPages) return;
    onPageChange(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;
    onPageChange(activePage - 1);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      pageButtons.push(
        <IconButton
          key={activePage + "-mobile"}
          variant={activePage === 1 ? "filled" : "text"}
          color="gray"
          onClick={() => onPageChange(1)}
        >
          1
        </IconButton>
      );

      if (activePage > 2) {
        pageButtons.push(
          <span key={"dots" + activePage + "-mobile"}>...</span>
        );
      }

      if (activePage > 1 && activePage < totalPages) {
        pageButtons.push(
          <IconButton
            key={`page-${activePage}-mobile`}
            variant="filled"
            color="gray"
            onClick={() => onPageChange(activePage)}
          >
            {activePage}
          </IconButton>
        );
      }

      if (activePage < totalPages - 1) {
        pageButtons.push(
          <span key={"dots2" + activePage + "-mobile"}>...</span>
        );
      }

      pageButtons.push(
        <IconButton
          key={`page2-${activePage}-mobile`}
          variant={activePage === totalPages ? "filled" : "text"}
          color="gray"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </IconButton>
      );
    } else {
      const startPage = Math.max(1, activePage - 4);
      const endPage = Math.min(totalPages, activePage + 5);

      if (startPage > 1) {
        pageButtons.push(
          <IconButton
            key={activePage + "desktop"}
            variant={activePage === 1 ? "filled" : "text"}
            color="gray"
            onClick={() => onPageChange(1)}
          >
            1
          </IconButton>
        );
        if (startPage > 2) {
          pageButtons.push(
            <span key={"dots" + activePage + "-desktop"}>...</span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <IconButton
            key={`page-${i}-desktop`}
            variant={activePage === i ? "filled" : "text"}
            color="gray"
            onClick={() => onPageChange(i)}
          >
            {i}
          </IconButton>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageButtons.push(
            <span key={"dots2" + activePage + "-desktop"}>...</span>
          );
        }
        pageButtons.push(
          <IconButton
            key={`page2-${totalPages}-desktop`}
            variant={activePage === totalPages ? "filled" : "text"}
            color="gray"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </IconButton>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div
      className={`flex items-center justify-center gap-1 md:gap-4 my-10 ${
        totalItems <= itemsPerPage ? "hidden" : "block"
      }`}
    >
      <Button
        variant="text"
        className="flex items-center gap-2 px-2 md:px-3"
        onClick={prev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>

      <div className="flex items-center gap-2 overflow-x-auto max-w-full">
        {renderPageButtons()}
      </div>

      <Button
        variant="text"
        className="flex items-center gap-2 px-2 md:px-3"
        onClick={next}
        disabled={activePage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Agregar validación de prop types
DefaultPagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
