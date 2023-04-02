import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const ReportingSearchInlineWidget = ({
  attr,
  callbackReportingSearchInlineWidget,
  children,
}) => {
  const [query, setQuery] = useState({
    jenis: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((values) => ({ ...values, [name]: value }));
  };

  const handleSearch = () => {
    callbackReportingSearchInlineWidget(query);
  };

  return (
    <>
      <InputGroup>
        <Form.Control
          name="jenis"
          type="text"
          placeholder="Jenis"
          value={query.jenis || ""}
          onChange={handleInput}
        />
        <Button {...attr} onClick={handleSearch}>
          <FaSearch /> Search
        </Button>
        {children}
      </InputGroup>
    </>
  );
};

export default ReportingSearchInlineWidget;
