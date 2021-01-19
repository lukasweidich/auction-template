import { TagOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Select, message, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setItemId, setSeller } from "../../actions/applicationSettingsActions";

import { buildMessageForStatus } from "../../src/utils/functions/statusMessageBuilder";
import validate from "../../src/utils/functions/validateAxiosStatusCodes";

const SelectItem = () => {
  const [sellerItemsLoading, setSellerItemsLoading] = useState(false);
  const [sellerItems, setSellerItems] = useState([]);

  const sellerItemsLoadingSuffix = sellerItemsLoading && (
    <Spin style={{ display: "flex" }} />
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const applicationSettings = useSelector((state) => state.applicationSettings);
  const { seller, itemIdIsKnown, siteId, itemId } = applicationSettings;

  const onChangeSeller = (e) => {
    dispatch(setSeller({ seller: e.target.value }));
  };

  const onSelectItemId = (value) => {
    dispatch(setItemId({ itemId: value }));
  };

  const onChangeItemId = (e) => {
    dispatch(setItemId({ itemId: e.target.value }));
  };

  const onSearchHandler = async () => {
    setSellerItemsLoading(true);
    if (seller) {
      const {
        data: { items = [], message, status },
      } = await axios.get(`/api/sellers/${seller}?siteId=${siteId}`, {
        ...validate,
      });
      setSellerItems(items);
      buildMessageForStatus({ ...{ status, message } });
    } else {
      message.warning("Please enter your eBay username");
    }
    setSellerItemsLoading(false);
  };

  return (
    <>
      {itemIdIsKnown ? (
        <Form.Item label="Enter the eBay item number">
          <Input
            placeholder="eBay item number"
            prefix={<TagOutlined />}
            value={itemId}
            onChange={onChangeItemId}
          />
        </Form.Item>
      ) : (
        <>
          <Form.Item label="Enter your eBay username">
            <Input.Search
              enterButton
              placeholder="eBay username"
              prefix={<UserOutlined />}
              value={seller}
              onChange={onChangeSeller}
              onSearch={onSearchHandler}
              suffix={sellerItemsLoadingSuffix}
            />
          </Form.Item>
          <Form.Item label="Select an eBay item">
            <Select
              placeholder={
                seller && sellerItems?.length > 0
                  ? "eBay item"
                  : "Enter username first"
              }
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={onSelectItemId}
              value={itemId || null}
            >
              {sellerItems.map((sellerItem, i) => {
                return (
                  <Select.Option value={sellerItem.itemId} key={i}>
                    {sellerItem.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </>
      )}
    </>
  );
};

export default SelectItem;
