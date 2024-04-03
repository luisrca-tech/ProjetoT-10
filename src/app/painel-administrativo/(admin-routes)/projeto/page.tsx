"use client";

import {
  Container,
  SwitchContainer,
  Footer,
  InputsData,
  InputsDataContainer,
} from "./styles";
import { SelectInputWithDropdown } from "@/app/components/SelectInputWithDropdown";
import { useState } from "react";
import ToogleSwitch from "@/app/components/ToogleSwitch";
import { poppins } from "@/app/fonts";

export default function Projeto() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Container className={poppins.className}>
      <SwitchContainer>
        <span>Editar datas</span>
        <ToogleSwitch onChange={handleChange} />
      </SwitchContainer>

      <InputsDataContainer>
        <InputsData>
          <SelectInputWithDropdown
            type="text"
            options={[
              { value: "back-end-sr", label: "Back-end Sr." },
              { value: "back-end-jr", label: "Back-end Jr." },
              { value: "back-end-pl", label: "Back-end PL" },
            ]}
            placeholder="Cargo"
          />
          <SelectInputWithDropdown
            type="number"
            options={[
              { value: "168h", label: "168h" },
              { value: "368h", label: "368h" },
              { value: "250h", label: "250h" },
            ]}
            placeholder="Horas"
            hasPrefix={true}
          />
          <SelectInputWithDropdown
            type="number"
            options={[
              { value: "R$ 150,00", label: "R$ 150,00" },
              { value: "R$ 200,00", label: "R$ 200,00" },
              { value: "R$ 120,00", label: "R$ 120,00" },
            ]}
            placeholder="Valor"
            hasPrefix={true}
          />
        </InputsData>

        <InputsData>
          <span className="RoleSpacing">Back-end SR</span>
          <SelectInputWithDropdown
            type="number"
            options={[
              { value: "168h", label: "168h" },
              { value: "368h", label: "368h" },
              { value: "250h", label: "250h" },
            ]}
            placeholder="Horas"
          />
          <SelectInputWithDropdown
            type="number"
            options={[
              { value: "R$ 150,00", label: "R$ 150,00" },
              { value: "R$ 200,00", label: "R$ 200,00" },
              { value: "R$ 120,00", label: "R$120,00" },
            ]}
            placeholder="Valor"
          />
        </InputsData>

        <InputsData>
          <span className="RoleSpacing">Back-end SR</span>
          <span>168h</span>
          <SelectInputWithDropdown
            type="number"
            options={[
              { value: "R$ 150,00", label: "R$ 150,00" },
              { value: "R$ 200,00", label: "R$ 200,00" },
              { value: "R$ 120,00", label: "R$ 120,00" },
            ]}
            placeholder="Valor"
          />
        </InputsData>

        <InputsData>
          <span className="RoleSpacing">Back-end SR</span>
          <span>84h</span>
          <span>150,00</span>
        </InputsData>

        <InputsData>
          <span className="RoleSpacing">Back-end SR</span>
          <span>20h</span>
          <span>150,00</span>
        </InputsData>

        <InputsData>
          <span className="RoleSpacing">Back-end SR</span>
          <span>168h</span>
          <span>150,00</span>
        </InputsData>

        <Footer>
          <strong>Total:</strong> <span>1584h</span>
          <span>178.200,00</span>
        </Footer>
      </InputsDataContainer>
    </Container>
  );
}
