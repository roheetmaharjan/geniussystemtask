"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import usersData from '../../lib/users.json';
import subscriptionsData from '../../lib/subscriptions.json';
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Search } from 'lucide-react';
import { findUserAndSubscription } from '../../utils/findUserAndSubscription';

const SubscribersPage = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [nameSortOrder, setNameSortOrder] = useState('asc'); // Track sort order for name column
    const [idSortOrder, setIdSortOrder] = useState('asc'); // Track sort order for ID column
    const [filter, setFilter] = useState(''); // Search filter state
    const [error, setError] = useState(null); 
    const [subscriptionFilter, setSubscriptionFilter] = useState(''); // Subscription filter state
    const [subscriptionOptions, setSubscriptionOptions] = useState([]); // Subscription options for dropdown
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const recordsPerPage = 20; // Number of records per page

    useEffect(() => {
        const loadSubscribers = async () => {
            try {
                const mergedData = usersData.map(user => {
                    const { subscription } = findUserAndSubscription(user.id);
                    return { ...user, subscription: subscription ? subscription.package : 'No Subscription' };
                });
                setSubscribers(mergedData);

                // Extract unique subscription types
                const uniqueSubscriptions = [...new Set(subscriptionsData.map(sub => sub.package))];
                setSubscriptionOptions(uniqueSubscriptions);
            } catch (err) {
                console.error("Error merging users and subscriptions:", err);
                setError("Error loading subscribers");
            }
        };

        loadSubscribers();
    }, []);

    // Handle sorting for Name column
    const handleSortByName = () => {
        const sortedSubscribers = [...subscribers].sort((a, b) => {
            const nameA = a.first_name ? a.first_name.toLowerCase() : '';
            const nameB = b.first_name ? b.first_name.toLowerCase() : '';
            return nameSortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });

        setSubscribers(sortedSubscribers);
        setNameSortOrder(nameSortOrder === 'asc' ? 'desc' : 'asc'); // Toggle the sort order for name column
    };

    // Handle sorting for ID column
    const handleSortById = () => {
        const sortedSubscribers = [...subscribers].sort((a, b) => {
            return idSortOrder === 'asc' ? a.id - b.id : b.id - a.id;
        });

        setSubscribers(sortedSubscribers);
        setIdSortOrder(idSortOrder === 'asc' ? 'desc' : 'asc'); // Toggle the sort order for ID column
    };

    // Handle filter changes
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Handle subscription filter changes
    const handleSubscriptionFilterChange = (event) => {
        setSubscriptionFilter(event.target.value);
    };

    // Filter the subscribers based on search term and subscription
    const filteredSubscribers = subscribers.filter(subscriber => {
        const searchTerm = filter.toLowerCase();
        const matchesSearchTerm = (
            subscriber.id.toString().includes(searchTerm) ||
            subscriber.first_name.toLowerCase().includes(searchTerm) ||
            subscriber.last_name.toLowerCase().includes(searchTerm) ||
            subscriber.email.toLowerCase().includes(searchTerm)
        );
        const matchesSubscription = subscriptionFilter === '' || subscriber.subscription === subscriptionFilter;
        return matchesSearchTerm && matchesSubscription;
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredSubscribers.length / recordsPerPage);

    // Get the records for the current page
    const currentRecords = filteredSubscribers.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate pagination buttons
    const renderPagination = () => {
        const paginationButtons = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                paginationButtons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={currentPage === i ? 'active' : ''}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            paginationButtons.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={currentPage === 1 ? 'active' : ''}
                >
                    1
                </button>
            );
            if (currentPage > 3) {
                paginationButtons.push(<span key="left-ellipsis">...</span>);
            }
            if (currentPage > 2) {
                paginationButtons.push(
                    <button
                        key={currentPage - 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        {currentPage - 1}
                    </button>
                );
            }
            if (currentPage !== 1 && currentPage !== totalPages) {
                paginationButtons.push(
                    <button
                        key={currentPage}
                        onClick={() => handlePageChange(currentPage)}
                        className="active"
                    >
                        {currentPage}
                    </button>
                );
            }
            if (currentPage < totalPages - 1) {
                paginationButtons.push(
                    <button
                        key={currentPage + 1}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        {currentPage + 1}
                    </button>
                );
            }
            if (currentPage < totalPages - 2) {
                paginationButtons.push(<span key="right-ellipsis">...</span>);
            }
            paginationButtons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={currentPage === totalPages ? 'active' : ''}
                >
                    {totalPages}
                </button>
            );
        }
        return paginationButtons;
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="box__title">
                <h2>Subscribers</h2>
            </div>
            <div className="card__filter">
                <div className="search__field">
                    <span className='search__icon'>
                        <Search size={20} color='#666' />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by ID, name, or email..."
                        value={filter}
                        onChange={handleFilterChange}
                        className='gs__form__input'
                    />
                </div>
                <select className='gs__form__select' title='Subscribers' value={subscriptionFilter} onChange={handleSubscriptionFilterChange}>
                    <option value="">All Subscribers</option>
                    {subscriptionOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                    <option value="No Subscription">No Subscription</option>
                </select>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            ID
                            <button onClick={handleSortById} className='sort__icon'>
                                {/* Icon for ID sorting */}
                                {idSortOrder === 'asc' ? <ArrowDownNarrowWide size={16} /> : <ArrowUpNarrowWide size={16} />}
                            </button>
                        </th>
                        <th>Image</th>
                        <th>
                            Name
                            <button onClick={handleSortByName} className='sort__icon'>
                                {/* Icon for Name sorting */}
                                {nameSortOrder === 'asc' ? <ArrowDownNarrowWide size={16} /> : <ArrowUpNarrowWide size={16} />}
                            </button>
                        </th>
                        <th>Email</th>
                        <th>Join Date</th>
                        <th>Subscription</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.length === 0 ? (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    ) : (
                        currentRecords.map(subscriber => (
                            <tr key={subscriber.id}>
                                <td>
                                    <Link href={`/subscribers/${subscriber.id}`}>
                                        {subscriber.id}
                                    </Link>
                                </td>
                                <td>
                                    <div className="alpha__image small">
                                        {subscriber.first_name.charAt(0)}{subscriber.last_name.charAt(0)}
                                    </div>
                                </td> 
                                <td>
                                    <Link href={`/subscribers/${subscriber.id}`}>
                                        {subscriber.first_name} {subscriber.last_name}
                                    </Link>
                                </td>
                                <td>{subscriber.email}</td>
                                <td>{new Date(parseInt(subscriber.join_date) * 1000).toLocaleDateString()}</td>
                                <td>{subscriber.subscription}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {renderPagination()}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default SubscribersPage;