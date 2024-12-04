import { createTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/table-core';

export default () => ({
    columns: [],
    original: [],
    data: [],
    pagination: {
        pageIndex: 0,
        pageSize: 10
    },
    table: null,
    route: "",
    modalOpen: false,

    toggleModal(id = null) {
        this.$refs.deleteForm.action = id !== null ? `${this.route}/${id}` : "";
        this.modalOpen = !this.modalOpen;
    },

    setupTable() {
        this.table = createTable({
            state: {
                columnPinning: {},
                pagination: this.pagination,
            },
            data: this.data,
            columns: [
                {
                    accessorKey: "number",
                    header: "No",
                    class: "w-10",
                    cell: ({ row }) => {
                        return `<p>${row.index + 1}</p>`;
                    }
                },
                ...this.columns,
                {
                    accessorKey: "actions",
                    header: "",
                    class: "w-40",
                    cell: ({ row }) => {
                        return this.renderActionButtons(row);
                    }
                }
            ],
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onPaginationChange: (updater) => {
                this.pagination = updater instanceof Function ? updater(this.pagination) : updater

                this.renderTable();
            }
        });
    },

    renderActionButtons(row) {
        return `
            <div class="inline-flex rounded-md shadow-sm">
                <a href="${this.route}/${row.original.id}" type="button" class="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-50 focus:outline-0 focus:z-10 focus:ring-2 focus:ring-gray-500">
                    <svg class="w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    Lihat
                </a>
                <a href="${this.route}/${row.original.id}/edit" class="inline-flex items-center px-3 py-2 text-xs font-medium text-yellow-400 bg-white border border-gray-200 hover:bg-gray-50 focus:outline-0 focus:z-10 focus:ring-2 focus:ring-yellow-400">
                    <svg class="w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    Edit
                </a>
                <button x-on:click="toggleModal(${row.original.id})" type="button" class="inline-flex items-center px-3 py-2 text-xs font-medium text-red-600 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-50 focus:outline-0 focus:z-10 focus:ring-2 focus:ring-red-600">
                    <svg class="w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Hapus
                </button>
            </div>
        `;
    },

    renderTable() {
        this.setupTable();

        const flexRenderer = (comp, attrs) => {
            if (typeof comp === "function") {
                return comp(attrs);
            }

            return comp
        };

        const tableHeader = this.table.getRowModel().rows.length > 0 ?
            this.table.getHeaderGroups().map(headerGroup => `
                <tr>
                    ${headerGroup.headers.map(header => `
                        <th scope="col" class="py-4 px-5 text-sm font-medium text-left text-gray-900 ${header.column.columnDef.class ?? ''}">
                            ${header.column.columnDef.header}
                        </th>
                    `).join('')}
                </tr>
            `).join('') : '';

        const tableBody = this.table.getRowModel().rows.length > 0 ?
            this.table.getRowModel().rows.map(row => `
                <tr>
                    ${row.getVisibleCells().map(cell => `
                        <td class="py-4 px-5 text-sm text-gray-900">
                            ${flexRenderer(cell.column.columnDef?.cell, cell.getContext())}
                        </td>
                    `).join('')}
                </tr>
            `).join('') : `
                <tr>
                    <td colspan="${this.columns.length + 1}" class="h-72 text-sm text-center text-gray-500">
                        Tidak ada data ditemukan
                    </td>
                </tr>
            `;

        this.$refs.tableContainer.innerHTML = `
            <table class="min-w-full divide-y divide-gray-200 table-fixed">
                ${tableHeader ? `<thead class="bg-gray-50">${tableHeader}</thead>` : ''}
                <tbody class="divide-y divide-gray-200">${tableBody}</tbody>
            </table>
        `;

        this.renderFooter()
    },

    renderPageNumbers() {
        const table = this.table;
        const pageCount = this.table.getPageCount();
        const currentPage = this.pagination.pageIndex;
        let html = "";

        for (let i = 0; i < pageCount; i++) {
            if (
                i === 0 ||
                i === pageCount - 1 ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                html += `
                    <button
                        class="flex items-center justify-center px-3 h-8 bg-white border border-gray-300 hover:text-green-500 hover:bg-gray-50 disabled:hover:bg-white ${
                            i === currentPage ? "text-green-500" : "text-gray-500 leading-tight"
                        }"
                        ${i === currentPage ? "disabled" : ""}
                        x-on:click="table.setPageIndex(${i})">
                        ${i + 1}
                    </button>
                `;
            } else if (
                (i === currentPage - 2 && i > 1) ||
                (i === currentPage + 2 && i < pageCount - 2)
            ) {
                html += `
                    <span class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">
                        ...
                    </span>
                `;
            }
        }

        return html;
    },

    renderFooter() {
        const table = this.table;
        const totalRows = table.getRowCount();
        const currentStart = this.pagination.pageIndex * this.pagination.pageSize + 1;
        const currentEnd = Math.min((this.pagination.pageIndex + 1) * this.pagination.pageSize, totalRows);

        this.$refs.paginationContainer.innerHTML = `
            <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Menampilkan
                <span class="font-semibold text-gray-900">
                    ${currentStart} - ${currentEnd}
                </span>
                dari
                <span class="font-semibold text-gray-900">${totalRows}</span>
            </span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <button
                        class="flex items-center justify-center px-2 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-50 disabled:hover:bg-white hover:text-green-500 disabled:hover:text-gray-500"
                        x-on:click="table.previousPage"
                        ${!table.getCanPreviousPage() ? "disabled" : ""}>
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </li>
                ${this.renderPageNumbers()}
                <li>
                    <button
                        class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-50 disabled:hover:bg-white hover:text-green-500 disabled:hover:text-gray-500"
                        x-on:click="table.nextPage"
                        ${!table.getCanNextPage() ? "disabled" : ""}>
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </li>
            </ul>
        `;

        this.table.getCoreRowModel().rows.length === 0 ?
            this.$refs.paginationContainer.classList.add('hidden') :
            this.$refs.paginationContainer.classList.remove('hidden')
    },

    setPageSize(size) {
        this.pagination.pageSize = this.table.setPageSize(Number(size));
        this.renderTable();
    },

    search(value) {
        const query = value.toLowerCase();

        this.data = this.original.filter((row) =>
            Object.entries(row).some(([key, cellValue]) => {
                if (key === 'id') return false;
                return cellValue.toString().toLowerCase().includes(query);
            })
        );
        this.renderTable();
    },

    createTable(data, columns, route) {
        this.original = data;
        this.data = data;
        this.columns = columns;
        this.route = route;
        this.renderTable();
    },
});
