import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { EmptyState } from "../components/common/StatusState";

const Wishlist = () => (
  <section className="page-shell py-10">
    <EmptyState
      action={
        <Link to="/products">
          <Button>Explore products</Button>
        </Link>
      }
      description="Wishlist API hooks are ready; saved products will render here once connected."
      title="No wishlist items yet"
    />
  </section>
);

export default Wishlist;
