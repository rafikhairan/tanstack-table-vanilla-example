@php
    $data = json_encode($data);
    $columns = json_encode($columns);
@endphp

<x-container x-data="dataTable" x-init="createTable({{ $data }}, {{ $columns }}, '{{ $route }}')">
    <div class="p-4 datatable block sm:flex items-center justify-between border-b border-gray-200">
        <div class="w-full flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <div class="w-80">
                    <x-forms.input x-on:input="search(event.target.value)" type="search" name="search" placeholder="Search">
                        <x-slot:icon>
                            <svg class="w-5 h-5 text-gray-500 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </x-slot>
                    </x-forms.input>
                </div>
                <div class="flex items-center">
                    <div class="w-20">
                        <x-forms.select x-on:change="setPageSize(event.target.value)" name="perPage" :items="[
                            [
                                'value' => '5',
                                'text' => '5'
                            ],
                            [
                                'value' => '10',
                                'text' => '10',
                                'selected' => true
                            ],
                            [
                                'value' => '25',
                                'text' => '25'
                            ],
                            [
                                'value' => '50',
                                'text' => '50'
                            ]
                        ]" />
                    </div>
                    <span class="text-sm text-gray-500 text-nowrap ml-2">
                        per halaman
                    </span>
                </div>
            </div>
            <x-button href='{{ route("$route.create") }}'>
                <x-slot:icon>
                    <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </x-slot>
                Tambah
            </x-button>
        </div>
    </div>
    <div>
        <div x-ref="tableContainer"></div>
        <nav x-ref="paginationContainer" class="flex items-center flex-column flex-wrap md:flex-row justify-between py-4 px-5 border-t border-gray-200"></nav>
    </div>
    <x-confirmation-modal />
</x-container>
