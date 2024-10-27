import { CarouselCustomNavigation } from "./CarouselCustomNavigation";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import categs from "../assets/categs.json";

export default function Home() {
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <div className="pt-20 md:pt-24 flex flex-col justify-start items-center md:h-full ">
      <CarouselCustomNavigation />

      <Card className="relative flex flex-col justify-center h-48 md:h-96 mb-20 mt-10 md:mb-14 w-[90%] overflow-hidden rounded-lg shadow-lg bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/50 z-0" />
        <CardBody className="relative z-10 h-full w-full flex flex-col justify-center items-center gap-3 lg:items-start lg:ml-4 lg:mt-4 lg:justify-start">
          <Typography className="text-xl md:text-3xl font-semibold md:font-bold uppercase leading-tight text-white">
            Conocé nuestro bazar
          </Typography>
          <Link to={"/products/"}>
            <div className="flex items-center justify-center w-32 mt-2 px-4 py-2 bg-black bg-opacity-85 hover:bg-opacity-90 text-white rounded-full shadow-lg gap-3 transition-transform duration-300 hover:scale-105">
              <Typography className="text-md font-medium leading-[1.5] tracking-wide text-white">
                Ver
              </Typography>
              <i className="fa-solid fa-chevron-right text-white text-sm"></i>
            </div>
          </Link>
        </CardBody>
      </Card>

      {/* Cards de categorias */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-10 w-screen md:max-w-[80%] 2xl:max-w-[70%] px-5 mb-10">
        {categs.map((category) => {
          const slug = createSlug(category.nombreCategoria);
          return (
            <Link
              key={category.idCategoria}
              to={`/products/${slug}`}
              className="flex flex-col justify-start relative bg-white w-full md:flex-grow md:basis-[300px] h-[250px] rounded-lg overflow-hidden shadow-lg bg-cover bg-center transform transition-transform duration-300 ease-in-out  border-0 border-transparent hover:scale-105  hover:border-[1.5px] hover:border-gray-500 hover:shadow-gray-800"
              style={{ backgroundImage: `url(${category.img})` }}
            >
              <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-55 text-white w-full rounded-b-lg">
                <h3 className="text-lg lg:text-xl font-semibold">
                  {category.nombreCategoria}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
