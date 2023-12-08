<?php

namespace App\Database\Macros;

use DB;
use Exception;
use Schema;

/**
 * OrderByConcat
 */
class OrderByConcat
{
	/**
	 * Memoize columns from table
	 *
	 * @var array
	 */
	private static $columnListings = [];

	/**
	 * @param $builder
	 * @param $columns
	 * @param string $direction
	 * @return mixed
	 * @throws \Exception
	 */
	public static function orderByConcat($builder, array $columns, $direction = 'asc')
	{
		$phrase = self::Builder($builder, $columns);

		return $builder->orderByRaw("{$phrase} {$direction}");
	}

	/**
	 * @param $builder
	 * @param $columns
	 * @param string $direction
	 * @return mixed
	 * @throws \Exception
	 */
	public static function orderByDescConcat($builder, array $columns)
	{
		return self::orderByConcat($builder, $columns, 'desc');
	}

	/**
	 * @param $builder
	 * @param $columns
	 * @return string
	 * @throws \Exception
	 */
	private static function Builder($builder, array $columns = [])
	{
		// SQL driver name as lowercase
		$driverName = self::getDatabaseDriverName($builder);

		// Columns from the table
		$tableColumns = self::getColumnsForTable($builder->from);

		// Determine how to wrap our field names
		$filter = function($field) use($tableColumns) {
			return in_array($field, $tableColumns)
				? "`{$field}`"
				: "'" . addslashes($field) . "'";
		};

		// Differentiate concatenation techniques per driver
		switch ($driverName) {
			case 'mysql':
				$concatPhrase = 'CONCAT(' . implode(', ', array_map($filter, $columns)) . ')';
				break;

			case 'sqlite':
				$concatPhrase = implode(' || ', array_map($filter, $columns));
				break;

			default:
				throw new Exception('Unsupported driver for whereConcat');
				break;
		}

		return $concatPhrase;
	}

	/**
	 * Fetch column listings for the table and cache them
	 *
	 * @param string $tableName
	 * @return array
	 */
	private static function getColumnsForTable(string $tableName): ?array
	{
		if (!isset(self::$columnListings[$tableName])) {
			self::$columnListings[$tableName] = DB::getSchemaBuilder()->getColumnListing($tableName);
		}

		return self::$columnListings[$tableName];
	}

	/**
	 * Return a simplified driver name for our connection that we
	 * can switch on.
	 *
	 * @return string
	 */
	private static function getDatabaseDriverName($builder): string
	{
		return strtolower($builder->getConnection()->getDriverName());
	}
}
