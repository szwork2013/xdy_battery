import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRetireSet.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRetireSet({dispatch, batteryRetireSet}) {
  console.log('batteryRetireSet')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRetireSet;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'batteryRetireSet/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRetireSet/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      dispatch({
        type: 'batteryRetireSet/visibleState',
        data: {
          modalType: type,
          visible: true
        }
      })
    }
  }
  const columns = [{
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: (text, record) => {
      return dic[text]
    }
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a  onClick={() => openModal('edit',record)}>编辑</a>
        <span className="ant-divider" />
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </span>
    ),
  }];
  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '用户名' }
    ]
  };

  const tableListProps = {
    curd: 'curd',
    openModal,
    tableProps: {
      data,
      columns,
      selectedRowKeys,
      loading,
      rowSelection: {
        onChange(selectedRowKeys, selectedRows) {
          dispatch({
            type: 'batteryRetireSet/selectedRowKeysState',
            data: selectedRowKeys
          })
        }
      },
    },
    pageProps: {
      current,
      pageSize,
      total,
      onShowSizeChange(current, pageSize) {
        dispatch({
          type: 'batteryRetireSet/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRetireSet/query',
          args: {
            current
          }
        })
      },
    }
  };
  const modalcusProps = {
    visible,
    record,
    title: modalType === 'add' ? '新增数据' : '编辑数据',
    onOk() {
      dispatch({
        type: 'batteryRetireSet/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRetireSet/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '用户名', field: 'name', type: 'Input' },
      { label: '年龄', field: 'age', type: 'InputNumber' },
      { label: '地址', field: 'address', type: 'Input' },
      {
        label: '性别', field: 'sex', type: 'Radio', dic: [
          { name: '男', value: 1 },
          { name: '女', value: 0 }
        ]
      }
    ]
  }
  const NewModalcus = () =>
    <Modalcus {...modalcusProps} />;

  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <NewModalcus />
    </div>
  );
}

BatteryRetireSet.propTypes = {
};

function mapStateToProps({batteryRetireSet}) {
  return { batteryRetireSet }
}
export default connect(mapStateToProps)(BatteryRetireSet);
