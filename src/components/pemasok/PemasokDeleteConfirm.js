import axios from "axios";
import { Button } from "react-bootstrap";
import PemasokService from "../../services/PemasokService";

const activity = {
  CANCEL: "PemasokDeleteConfirm.CANCEL",
  REFRESH: "PemasokDeleteConfirm.REFRESH",
};

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
          handleCallback(activity.REFRESH, responses);
        })
      )
      .catch((errors) => console.log(errors));
  };

  return (
    <>
      {daftarPemasok.length > 0 && (
        <>
          <div
            className={`btn-group ${classes}`}
            role="group"
            aria-label="Basic example">
            <Button
              variant={variant}
              size={size}
              onClick={handlePemasokServiceRemove}>
              {textButton} {daftarPemasok.length} item
            </Button>
            <Button
              variant={variant}
              size={size}
              onClick={() => handleCallback(activity.CANCEL)}>
              Batal
            </Button>
          </div>
        </>
      )}
    </>
  );
};

PemasokDeleteConfirm.activity = activity;

export default PemasokDeleteConfirm;
