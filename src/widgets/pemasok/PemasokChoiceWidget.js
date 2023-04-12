import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Form, InputGroup, Modal, Table } from "react-bootstrap";
import PemasokService from "../../services/PemasokService";
import { FaArrowDown } from "react-icons/fa";
import PemasokSearchWidget from "./PemasokSearchWidget";
import PemasokSearchInlineWidget from "./PemasokSearchInlineWidget";

const initQuery = { page: 1, limit: 7 };

const PemasokChoiceWidget = ({
  callbackPemasokChoiceWidget,
  onlyButton = true,
  dataInjection,
}) => {
  const [show, setShow] = useState(false);
  const [daftarPemasok, setDaftarPemasok] = useState([]);
  const [query, setQuery] = useState(initQuery);
  const [pemasokReview, setPemasokReview] = useState({});

  const handlePemasokServiceList = () => {
    PemasokService.list(query)
      .then((response) => {
        setDaftarPemasok(response.data);
      })
      .catch((error) => {});
  };

  const callbackPemasokSearchInlineWidget = (q) => {
    setQuery((values) => ({ ...values, ...q }));
  };

  const handleChoice = (pemasok) => {
    setPemasokReview(pemasok);
    if (dataInjection) {
      callbackPemasokChoiceWidget({ ...pemasok, ...dataInjection });
    } else {
      callbackPemasokChoiceWidget(pemasok);
    }
    setShow(false);
  };

  useEffect(() => {
    handlePemasokServiceList();
  }, [query]);

  return (
    <>
      {!onlyButton && (
        <InputGroup>
          <Form.Control
            type="text"
            disabled
            value={pemasokReview.namaPemasok || ""}
          />
          <Button onClick={() => setShow(true)}>Pilih Pemasok</Button>
        </InputGroup>
      )}

      {onlyButton && (
        <Button onClick={() => setShow(true)}>Pilih Pemasok</Button>
      )}

      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Pilih Pemasok</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PemasokSearchInlineWidget
            isShowKodePemasok={true}
            isShowNamaPemasok={true}
            q={query}
            callbackPemasokSearchInlineWidget={
              callbackPemasokSearchInlineWidget
            }
          />
        </Modal.Body>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Pemasok</th>
              <th>Alamat Pemasok</th>
              <th>Telepon Pemasok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarPemasok.map((pemasok, index) => (
              <tr key={index}>
                <td>{pemasok.kodePemasok}</td>
                <td>{pemasok.namaPemasok}</td>
                <td>{pemasok.alamatPemasok}</td>
                <td>{pemasok.teleponPemasok}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleChoice(pemasok);
                    }}>
                    <FaArrowDown />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal>
    </>
  );
};

export default React.memo(PemasokChoiceWidget);
