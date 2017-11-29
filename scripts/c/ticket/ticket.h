#ifndef _TICKET_H_
#define _TICKET_H_

#include <sys/queue.h>
#include <time.h>

#define JUST_SUBMITTED 1
#define IMMEDIATE_RETURN 2
#define NOT_IMMEDIATE_RETURN 3

typedef struct ticket {
	void * nanos_ctx;
	ssize_t ret_status;
	char just_submitted;

	LIST_ENTRY(ticket) entries;
} ticket_t;


LIST_HEAD(ticket_head_t, ticket) ticket_head;
typedef struct ticket_head_t ticket_head_t;


void init_tickets(ticket_head_t *head, int length);

ticket_t * get_ticket(ticket_head_t *head);
void put_ticket(ticket_head_t *head, ticket_t *ticket);

#endif // _TICKET_H_
