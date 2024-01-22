"""change duration from interval to string

Revision ID: 6be6db1d4241
Revises: 2e1c225c745f
Create Date: 2024-01-22 11:51:59.802450

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6be6db1d4241'
down_revision = '2e1c225c745f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Workouts', schema=None) as batch_op:
        batch_op.alter_column('duration',
               existing_type=sa.DATETIME(),
               type_=sa.String(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Workouts', schema=None) as batch_op:
        batch_op.alter_column('duration',
               existing_type=sa.String(),
               type_=sa.DATETIME(),
               existing_nullable=False)

    # ### end Alembic commands ###