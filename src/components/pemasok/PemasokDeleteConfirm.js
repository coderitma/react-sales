import axios from "axios";
import { Button } from "react-bootstrap";
import PemasokService from "../../services/PemasokService";

const PemasokDeleteConfirm = ({
  handleCallback,
  daftarPemasok,
  variant,
  size,
  textButton,
  classes,
}) => {
  const handlePemasokServiceRemove = () => {
    PemasokService.removeAll(daftarPemasok)
      .then(
        axios.spread((...responses) => {
          handleCallback(responses);
        })
      )
      .catch((errors) => console.log(errors));
  };

  return (
    <>
      {daftarPemasok.length > 0 && (
        <>
          <Button
            variant={variant}
            size={size}
            className={classes}
            onClick={handlePemasokServiceRemove}>
            {textButton} {daftarPemasok.length} item
          </Button>
        </>
      )}
    </>
  );
};

export default PemasokDeleteConfirm;
