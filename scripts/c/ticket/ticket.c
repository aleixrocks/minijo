#include <stdlib.h>
#include <pthread.h>


#include "ticket.h"
#include "common.h"


#define MORE_TICKETS 1000


pthread_spinlock_t lock;


// allocate length tickets and return a pointer to the first one.
ticket_t * __malloc_tickets(int length) {
	ticket_t *tickets;

	tickets = (ticket_t *) malloc(length*sizeof(ticket_t));
	if (tickets == NULL) {
		libc_abort("Error while allocating tickets memory");
	}

	return tickets;
}

// insert allocatated tickets into the list head
void __insert_tickets(ticket_head_t *head, ticket_t *tp, int length) {
	int i;

	get_spinlock(&lock);
	for (i = 0; i < length; i++) {
		LIST_INSERT_HEAD(head, &tp[i], entries);
	}
	put_spinlock(&lock);
}

// allocate length tickets and attach them to the head list.
void __alloc_tickets(ticket_head_t *head, int length) {
	ticket_t *tp;

	tp = __malloc_tickets(length);
	__insert_tickets(head, tp, length);
}

// allocate length tickets, attach length-1 tickets to the list head
// and return a pointer to an unattached ticket.
ticket_t * __alloc_tickets_extra(ticket_head_t *head, int length) {
	ticket_t *tp;

	tp = __malloc_tickets(length);
	__insert_tickets(head, tp+1, length-1);

	return &tp[0];
}

// Initiate the head list and populate it with length tickets.
void init_tickets(ticket_head_t *head, int length) {
	LIST_INIT(head);

	init_spinlock(&lock);

	__alloc_tickets(head, length);
}

// destory tickets and related structures.
void destory_tickets(ticket_head_t *head, int length) {
	ticket_t * ticket;

	while (head->lh_first != NULL) {
		ticket = head->lh_first;
		LIST_REMOVE(head->lh_first, entries);
		free(ticket);
	}

	if (pthread_spin_destroy(&lock)) {
		libc_abort("Error destroying spinlock");
	}
}

// Get a ticket from the head list. If no more tickets left,
// MORE_TICKETS tickets are allocated to the list.
ticket_t * get_ticket(ticket_head_t *head) {
	ticket_t * ticket;

	get_spinlock(&lock);
	if (head->lh_first != NULL) {
		ticket = head->lh_first;
		LIST_REMOVE(head->lh_first, entries);
		put_spinlock(&lock);
	} else {
		put_spinlock(&lock);
		ticket = __alloc_tickets_extra(head, MORE_TICKETS);
	}

	return ticket;
}

// Return a ticket to the list.
void put_ticket(ticket_head_t *head, ticket_t *ticket) {
	get_spinlock(&lock);
	LIST_INSERT_HEAD(head, ticket, entries);
	put_spinlock(&lock);
}
