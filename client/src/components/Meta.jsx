import { Helmet } from "react-helmet";

const Meta = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </div>
  );
};

export default Meta;
