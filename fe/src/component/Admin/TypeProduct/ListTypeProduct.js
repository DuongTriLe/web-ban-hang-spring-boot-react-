
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const ListTypeProduct = (props) => {
    const { TypeProductList, handlePageClick, pageCount, handleSelecttypeproduct, deletetypeproduct } = props

    const handleEditClick = (id) => {
        handleSelecttypeproduct(id);
    };

    const handleDeleteClick = (id) => {
        deletetypeproduct(id);
    };

    return (
        <>
            <div className="card shadow mb-4">
                {/* Card Header - Dropdown */}
                <div className="card-header ">
                    <h6 className="m-0 font-weight-bold text-primary">Bảng danh sách</h6>
                </div>
                {/* Card Body */}
                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellSpacing={0}
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    TypeProductList.map(item => {
                                        const imageUrl = `http://localhost:8080/display/files/${item.image}`;
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td><img src={imageUrl} alt="" style={{ width: '100px', height: '100px' }} /></td>
                                                <td>
                                                    <button className="btn btn-outline-warning" onClick={() => handleEditClick(item.id)}>
                                                        <i className="fas fa-edit" />
                                                    </button>
                                                    <button className="btn btn-outline-danger" onClick={() => handleDeleteClick(item.id)}>
                                                        <i className="fas fa-recycle" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ListTypeProduct
