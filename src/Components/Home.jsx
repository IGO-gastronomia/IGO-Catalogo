import { CarouselCustomNavigation } from "./CarouselCustomNavigation";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
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
    <div className="  flex flex-col justify-start items-center bg-gray-500 ">
      <CarouselCustomNavigation />

      <Card className=" h-[200px] mb-20 mt-10 md:mb-14 w-[90%] items-center justify-center overflow-hidden text-center rounded-lg shadow-lg">
        <CardHeader className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative flex items-end justify-center p-4">
          <div className="text-center flex flex-col items-center gap-3">
            <Typography className="text-xl font-semibold leading-tight text-white">
              Conocé nuestro bazar
            </Typography>

            <Link to={"https://www.google.com"}>
              <div className="flex items-center justify-center w-32  mt-2 px-4 py-2 bg-gray-700 bg-opacity-60 hover:bg-gray-800 text-white rounded-full shadow-lg gap-3 transition-transform duration-300 hover:scale-105">
                <Typography className="text-md font-medium leading-[1.5] tracking-wide text-white">
                  Ver
                </Typography>
                <i className="fa-solid fa-chevron-right text-white text-sm"></i>
              </div>
            </Link>
          </div>
        </CardBody>
      </Card>

      {/* Cards de categorias */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-14 w-screen mb-10">
        {categs.map((category) => {
          const slug = createSlug(category.nombreCategoria);
          return (
            <Link
              key={category.idCategoria}
              to={`/products/${slug}`}
              className="leading-[2.5] flex flex-col justify-start relative bg-white w-full sm:w-[90%] h-[200px] rounded-lg overflow-hidden shadow-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${category.img})` }}
            >
              <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-55 text-white w-full rounded-b-lg">
                <h3 className="text-lg font-semibold">
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
