import { listBarang } from "@/actions";
import Form from "@/components/Form";
import ListItems from "@/components/ListItems";

const Home = async () => {
  const barangList = await listBarang();

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-2 p-6">
      <div className="w-full lg:w-1/2">
        <Form />
      </div>
      <div className="w-full lg:w-1/2">
        {barangList &&
          <ListItems barangList={barangList} />
        }
      </div>
    </div>
  );
}

export default Home;
