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

  // Botones de atras y siguiente para avanzar y/o retrocederen la paginacion
  const next = () => {
    if (activePage === totalPages) return;
    onPageChange(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;
    onPageChange(activePage - 1);
  };

  // Mostrar cantidad de botones de paginacion
  const renderPageButtons = () => {
    const pageButtons = [];
    const isMobile = window.innerWidth < 768; // Detecta si la pantalla es móvil usando el ancho

    if (isMobile) {
      // Mostrar la primera, la actual y la última página en pantallas móviles
      pageButtons.push(
        <IconButton
          key={1}
          variant={activePage === 1 ? "filled" : "text"}
          color="gray "
          onClick={() => onPageChange(1)}
        >
          1
        </IconButton>
      );

      if (activePage > 2) {
        pageButtons.push(<span key="start-ellipsis">...</span>);
      }

      if (activePage > 1 && activePage < totalPages) {
        pageButtons.push(
          <IconButton
            key={activePage}
            variant="filled"
            color="gray"
            onClick={() => onPageChange(activePage)}
          >
            {activePage}
          </IconButton>
        );
      }

      if (activePage < totalPages - 1) {
        pageButtons.push(<span key="end-ellipsis">...</span>);
      }

      pageButtons.push(
        <IconButton
          key={totalPages}
          variant={activePage === totalPages ? "filled" : "text"}
          color="gray"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </IconButton>
      );
    } else {
      // Mostrar hasta 10 botones en pantallas grandes
      const startPage = Math.max(1, activePage - 4);
      const endPage = Math.min(totalPages, activePage + 5);

      if (startPage > 1) {
        pageButtons.push(
          <IconButton
            key={1}
            variant={activePage === 1 ? "filled" : "text"}
            color="gray"
            onClick={() => onPageChange(1)}
          >
            1
          </IconButton>
        );
        if (startPage > 2)
          pageButtons.push(<span key="start-ellipsis">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <IconButton
            key={i}
            variant={activePage === i ? "filled" : "text"}
            color="gray"
            onClick={() => onPageChange(i)}
          >
            {i}
          </IconButton>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1)
          pageButtons.push(<span key="end-ellipsis">...</span>);
        pageButtons.push(
          <IconButton
            key={totalPages}
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
      className={`flex items-center gap-1 md:gap-4 my-10  ${
        totalItems <= itemsPerPage ? "hidden" : "block"
      }`}
    >
      <Button
        variant="text"
        className="flex items-center gap-2  px-2 md:px-3"
        onClick={prev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 " /> Previous
      </Button>

      <div className="flex items-center gap-2 overflow-x-auto max-w-full">
        {renderPageButtons()}
      </div>

      <Button
        variant="text"
        className="flex items-center gap-2 px-2  md:px-3"
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
